package com.sm.backend.service;


import javax.tools.*;
import java.io.*;
import java.lang.reflect.Method;
import java.net.*;
import java.util.Arrays;
import java.util.List;
import java.util.regex.*;

import com.sm.backend.util.JavaSourceFromString;
import org.springframework.stereotype.Service;

@Service
public class CodeExecutionService {

    public String compileAndRun(String sourceCode) throws Exception {
        System.out.println("Starting compilation...");

        String className = extractClassName(sourceCode);
        if (className == null) {
            throw new IllegalArgumentException("No valid public class found in the source code.");
        }

        System.out.println("Class name extracted: " + className);

        JavaCompiler compiler = ToolProvider.getSystemJavaCompiler();
        DiagnosticCollector<JavaFileObject> diagnostics = new DiagnosticCollector<>();
        StandardJavaFileManager fileManager = compiler.getStandardFileManager(diagnostics, null, null);

        JavaFileObject file = new JavaSourceFromString(className, sourceCode);

        Iterable<? extends JavaFileObject> compilationUnits = Arrays.asList(file);
        JavaCompiler.CompilationTask task = compiler.getTask(null, fileManager, diagnostics, null, null, compilationUnits);

        System.out.println("Compiling...");

        boolean success = task.call();
        System.out.println("Compilation finished: " + success);

        fileManager.close();

        if (success) {
            System.out.println("Loading class...");
            URLClassLoader classLoader = URLClassLoader.newInstance(new URL[]{new File("").toURI().toURL()});
            Class<?> cls = Class.forName(className, true, classLoader);

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            PrintStream printStream = new PrintStream(baos);
            PrintStream oldOut = System.out;
            System.setOut(printStream);

            System.out.println("Invoking main method...");
            Method mainMethod = cls.getDeclaredMethod("main", String[].class);
            mainMethod.setAccessible(true);
            Object[] arguments = {new String[0]};
            mainMethod.invoke(null, arguments);

            System.out.flush();
            System.setOut(oldOut);

            return baos.toString();
        } else {
            StringBuilder errorMessage = new StringBuilder();
            for (Diagnostic<? extends JavaFileObject> diagnostic : diagnostics.getDiagnostics()) {
                errorMessage.append(diagnostic.getMessage(null)).append("\n");
            }
            throw new Exception("Compilation failed: " + errorMessage.toString());
        }
    }



    private String extractClassName(String sourceCode) {
        Pattern pattern = Pattern.compile("public\\s+class\\s+(\\w+)\\s*\\{");
        Matcher matcher = pattern.matcher(sourceCode);
        if (matcher.find()) {
            return matcher.group(1);
        }
        return null;
    }

}


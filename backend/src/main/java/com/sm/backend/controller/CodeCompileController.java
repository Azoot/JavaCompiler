package com.sm.backend.controller;


import com.sm.backend.request.CodeExecutionRequest;
import com.sm.backend.service.CodeExecutionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/compile")
public class CodeCompileController {

    public final CodeExecutionService codeExecutionService;


    public CodeCompileController(CodeExecutionService codeExecutionService) {
        this.codeExecutionService = codeExecutionService;
    }

    @PostMapping("/execute")
    public ResponseEntity<String> executeCode(@RequestBody CodeExecutionRequest request) {
        try {
            String result = codeExecutionService.compileAndRun(request.sourceCode());
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}

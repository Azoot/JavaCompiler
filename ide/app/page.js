"use client";
import { useState } from "react";
import Editor from "@monaco-editor/react";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faJava,faBuffer } from "@fortawesome/free-brands-svg-icons";

const files = {
  "Main.java": {
    name: "Main.java",
    language: "java",
    value: `import java.util.Date;

public class Main {
    public static void main(String[] args) {
        Date date = new Date();
        System.out.println("Today's date is " + date);
    }
}`,
  },
};


export default function Home() {
  const [fileName, setFileName] = useState("Main.java");
  const [output, setOutput] = useState("");

  const file = files[fileName];

  function handleEditorChange(value) {
    file.value = value;
  }

  async function runCode() {
    const response = await fetch('http://localhost:8080/api/compile/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sourceCode: file.value }),
    });

    const result = await response.text();
    setOutput(result);
  }

  return (
      <>
        <div>
          <div className={styles.topBar}>
            <button
                className={styles.javaButton}
                disabled={fileName === "Main.java"}
                onClick={() => setFileName("Main.java")}
            >
              <div>
                <FontAwesomeIcon icon={faJava} />
              </div>
              Main.java
            </button>
            <button className={styles.playButton} onClick={runCode}>
              <div>
                <FontAwesomeIcon icon={faBuffer} />
              </div>
              Run
            </button>
          </div>
          <Editor
              height="75vh"
              theme="vs-dark"
              path={file.name}
              defaultLanguage={file.language}
              defaultValue={file.value}
              onChange={handleEditorChange}
              value={file.value}
          />
        </div>
        <div className={styles.outputWindow}>
          <pre>{output}</pre>
        </div>
      </>
  );
}

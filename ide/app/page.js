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

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Main {

    // Entry point of the application
    public static void main(String[] args) {
        // Initialize DateService
        DateService dateService = new DateService();

        // Get today's date
        LocalDateTime today = dateService.getToday();

        // Get date as string
        String dateString = dateService.dateToString(today);

        // Print date
        dateService.printDate(dateString);
    }
}

class DateService {
    private DateTimeFormatter dateTimeFormatter;

    // Constructor
    public DateService() {
        this.dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    }

    // Returns today's date
    public LocalDateTime getToday() {
        return LocalDateTime.now();
    }

    // Converts date to string
    public String dateToString(LocalDateTime date) {
        return this.dateTimeFormatter.format(date);
    }

    // Prints date
    public void printDate(String date) {
        System.out.println("Today's date is " + date);
    }
}`,
  },
};


export default function Home() {
  const [fileName, setFileName] = useState("Main.java");
  const [output, setOutput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);


  function handleEditorChange(value) {
    setFiles(oldFiles => {
      return {
        ...oldFiles,
        [fileName]: { ...oldFiles[fileName], value: value }
      };
    });
  }

// get the file like this now
  const file = files[fileName];

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
    setIsModalOpen(true);
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
          <div>
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
          {isModalOpen && (
              <div className={styles.modal}>
                <div className={styles.modalContent}>
                  <div className={styles.closeButton} onClick={() => setIsModalOpen(false)}>&times;</div>
                  <p>{output}</p>
                </div>
              </div>
          )}
        </div>
        </div>
      </>
  );
}

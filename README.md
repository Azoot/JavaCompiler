## Project Overview

This project is a **Web-Based IDE** built with **Next.js** and **Monaco Editor**, coupled with a backend service using **Spring Boot** for **compiling and executing code**. The application provides an interactive interface for writing and editing code directly in the browser, with the backend handling the execution logic and returning the results.

### Technology Stack

- **Frontend:**
  - **Framework:** [Next.js](https://nextjs.org/)
  - **Code Editor:** [Monaco Editor](https://microsoft.github.io/monaco-editor/)
  - **Purpose:** Delivers a responsive, server-side rendered web application with an integrated code editor.
  
- **Backend:**
  - **Framework:** [Spring Boot](https://spring.io/projects/spring-boot)
  - **Purpose:** Provides RESTful APIs for compiling and executing the code written in the frontend. It processes user requests and returns the output to be displayed in the frontend.
  
### Architecture

- **Frontend (Next.js):**
  - Handles user interactions, including code editing, submission, and displaying results.
  - Implements server-side rendering for improved performance and SEO.
  - Integrates the Monaco Editor for a rich, in-browser coding experience.
  
- **Backend (Spring Boot):**
  - Acts as a service responsible for executing code in a secure and controlled environment.
  - Compiles and runs the code, then returns the output or error messages back to the frontend.
  - Manages API endpoints for communication with the frontend.

### Key Features

- **Interactive Code Editing:** Leverages Monaco Editor to provide a feature-rich code editing experience with syntax highlighting and IntelliSense.
- **Code Execution:** The Spring Boot backend compiles and executes the code, providing real-time feedback and output.
- **Scalable Architecture:** Separation of concerns between the frontend and backend allows for independent scaling and maintenance.

### How It Works

1. **User Interaction:** Users write and edit code using the Monaco Editor integrated into the Next.js frontend.
2. **Code Submission:** The code is sent to the Spring Boot backend via RESTful API calls.
3. **Backend Processing:** The Spring Boot service compiles and executes the code in a secure environment.
4. **Output Display:** The execution result or errors are returned to the frontend and displayed to the user.


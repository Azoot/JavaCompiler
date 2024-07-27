'use client';

import { useState, useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles//base16/github.css';
import java from 'highlight.js/lib/languages/java';

hljs.registerLanguage('java', java);


export default function CodeEditor() {
    const [sourceCode, setSourceCode] = useState<string>('');
    const [result, setResult] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [highlightedCode, setHighlightedCode] = useState<string>('');


    const handleSubmit = async () => {
        try {
            const response = await fetch('/api/compile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sourceCode })
            });

            if (response.ok) {
                const data = await response.text();
                setResult(data);
                setError('');
            } else {
                const errorData = await response.text();
                setResult('');
                setError(errorData);
            }
        } catch (err) {
            setResult('');
            setError('An error occurred: ' + (err as Error).message);
        }
    };

    // Use effect to highlight syntax on code change
    useEffect(() => {
        const code = sourceCode; // The source code to be highlighted
        const highlighted = hljs.highlight(code, { language: 'java' }).value;
        setHighlightedCode(highlighted);
    }, [sourceCode]);

    return (
        <div>
      <textarea
          className={'text-black'}
          rows={30}
          cols={100}
          value={sourceCode}
          onChange={(e) => setSourceCode(e.target.value)}
      />
            <br/>
            <button onClick={handleSubmit}>Compile & Run</button>
            <div>
                <h2>Output:</h2>
                <pre>{result}</pre>
                <h2>Error:</h2>
                <pre style={{color: 'red'}}>{error}</pre>
            </div>
            <div>
                <h2>Highlighted Code:</h2>
                <pre dangerouslySetInnerHTML={{__html: highlightedCode}}/>
            </div>
        </div>
    );
}

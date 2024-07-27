import dynamic from 'next/dynamic';
import RootLayout from './layout';


const CodeEditor = dynamic(() => import('./CodeEditor'), { ssr: false });

export default function Home() {
    return (
        <RootLayout>
            <div>
                <h1>Java Code Compiler</h1>
                <CodeEditor />
            </div>
        </RootLayout>
    );
}



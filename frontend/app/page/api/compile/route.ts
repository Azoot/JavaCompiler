import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { sourceCode } = await req.json();

    try {
        const response = await fetch('http://localhost:8080/api/compile/execute', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sourceCode })
        });

        const result = await response.text();
        return NextResponse.json(result, { status: response.ok ? 200 : 500 });
    } catch (error) {
        return NextResponse.json('An error occurred: ' + (error as Error).message, { status: 500 });
    }
}

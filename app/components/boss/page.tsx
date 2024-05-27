// app/page.tsx

'use client';
import { Button } from "@/imcomponents/ui/button"
import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch('/api/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    setResult(data.result);
  };

  return (
    <div>
      <h1>OpenAI API with Next.js</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          className="border border-gray-300"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={10}
          cols={50}
        />
        
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
      </form>
      <div>
        <h2 >Result</h2>
        <p className="border border-gray-300 rounded-lg p-2 w-full h-40 focus:outline-none focus:ring-2 focus:ring-blue-500">{result}</p>
      </div>
    </div>
  );
}

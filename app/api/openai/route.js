// app/api/openai/route.ts

import { Configuration, OpenAIApi } from 'openai';
import { NextRequest, NextResponse } from 'next/server';




export async function POST(request) {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
      
    const openai = new OpenAIApi(configuration);
    const { prompt } = await request.json();

  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 100,
    });
    return NextResponse.json({ result: response.data.choices[0].text });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

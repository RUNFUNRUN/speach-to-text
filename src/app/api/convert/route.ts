import { NextRequest, NextResponse } from 'next/server';
import { speachToText } from '../_lib/openai';

export async function POST(req: NextRequest) {
  try {
    const formdata = await req.formData();
    if (!formdata) throw new Error('No data');

    const apiKey = formdata.get('apiKey')?.toString();
    const file = formdata.get('file') as File;

    if (!apiKey || !file) throw new Error('No data');

    const text = await speachToText(apiKey, file);
    return NextResponse.json({ text });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

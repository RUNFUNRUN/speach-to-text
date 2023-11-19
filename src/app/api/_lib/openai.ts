import OpenAI from 'openai';

export const speachToText = async (apiKey: string, audio: File) => {
  const openai = new OpenAI({ apiKey });
  const res = await openai.audio.transcriptions.create({
    file: audio,
    model: 'whisper-1',
    language: 'ja',
  });

  return res.text;
};

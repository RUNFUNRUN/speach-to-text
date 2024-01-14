import OpenAI from 'openai';
import { z } from 'zod';

export const speachToText = async (apiKey: string, audio: File) => {
  const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
  const res = await openai.audio.transcriptions
    .create({
      file: audio,
      model: 'whisper-1',
      language: 'ja',
    })
    .catch((err) => {
      throw new Error(err);
    });

  return res.text;
};

export const fixText = async (apiKey: string, text: string) => {
  const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    {
      role: 'system',
      content:
        'あなたは文章の添削を行います。音声認識された文章が提供されるので、文脈に合わせて適切な感じや句読点に修正してください。また、出力はJSONで行ってください。JSONは{"content": "出力した文章"}の形でお願いします。',
    },
    {
      role: 'user',
      content:
        '以下のメッセージの誤字脱字を修正してください。なければそのまま出力してください。\n\n```\n' + text + '\n```',
    },
  ];

  const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
  const res = await openai.chat.completions
    .create({
      model: 'gpt-3.5-turbo-1106',
      messages: messages,
      response_format: { type: 'json_object' },
    })
    .catch((err) => {
      throw new Error(err);
    });

  const jsonStr = res.choices[0].message.content;
  if (!jsonStr) throw new Error('jsonStr is empty');

  const Json = z.object({
    content: z.string(),
  });

  type Json = z.infer<typeof Json>;

  try {
    const json: Json = Json.parse(JSON.parse(jsonStr));
    return json.content;
  } catch (e) {
    return undefined;
  }
};

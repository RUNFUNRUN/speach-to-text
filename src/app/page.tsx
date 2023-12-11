'use client';

import { useEffect, useState } from 'react';
import { TabsTrigger, TabsList, TabsContent, Tabs } from '@/components/ui/tabs';
import { Toaster } from '@/components/ui/toaster';
import { AudioFile } from './_components/tabContent/AudioFile';
import { Recording } from './_components/tabContent/Recorfing';

export default function Home() {
  const [apiKey, setApiKey] = useState<string>('');

  useEffect(() => {
    const apiKey = localStorage.getItem('apiKey');
    if (!apiKey) return;
    setApiKey(apiKey);
  }, []);

  return (
    <main>
      <div className="w-full px-4 py-4">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl sm:leading-[3.5rem]">speach-to-text</h1>
        </div>
        <section className="container mx-auto w-full">
          <Tabs className="flex flex-col items-start w-full" defaultValue="audioFile">
            <TabsList className="justify-center flex gap-4 w-full">
              <TabsTrigger value="audioFile">audio file</TabsTrigger>
              <TabsTrigger value="recording">recording</TabsTrigger>
            </TabsList>
            <div className="m-2" />
            <TabsContent className="w-full flex justify-center" value="audioFile">
              <div className="w-full">
                <AudioFile apiKey={apiKey} setApiKey={setApiKey} />
              </div>
            </TabsContent>
            <TabsContent className="m-0 w-full flex justify-center" value="recording">
              <div className="w-full">
                <Recording apiKey={apiKey} setApiKey={setApiKey} />
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </div>
      <Toaster />
    </main>
  );
}

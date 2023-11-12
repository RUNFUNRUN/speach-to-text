'use client';

import { useEffect, useState } from 'react';
import { TabsTrigger, TabsList, TabsContent, Tabs } from '@/components/ui/tabs';
import { AudioFile } from './_components/tabContent/AudioFile';

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
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl lg:leading-[3.5rem]">speach-to-text</h1>
        </div>
        <section className="container mx-auto w-full">
          <Tabs className="flex flex-col gap-2 items-start w-full" defaultValue="audioFile">
            <TabsList className="justify-center flex gap-4 w-full">
              <TabsTrigger value="audioFile">audio file</TabsTrigger>
              <TabsTrigger value="recording">recording</TabsTrigger>
            </TabsList>
            <TabsContent className="p-1 w-full flex justify-center" value="audioFile">
              <div className="mb-4 pb-4 w-full">
                <AudioFile apiKey={apiKey} setApiKey={setApiKey} />
              </div>
            </TabsContent>
            <TabsContent className="p-1 w-full flex justify-center" value="recording">
              <div className="mb-4 pb-4 w-full">
                <p className="text-sm font-medium">coming soon...</p>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </main>
  );
}

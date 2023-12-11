import { useState } from 'react';
import { ApiKeyProps } from '@/app/_types';
import { Input } from '@/components/ui/input';
import { SetApiKeyButton } from '../ui/SetApiKeyButton';
import { ConvertButton } from '../ui/ConvertButton';
import { TextBox } from '../ui/TextBox';

export const AudioFile = ({ apiKey, setApiKey }: ApiKeyProps) => {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [text, setText] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFile(file);
  };

  return (
    <div className="text-center">
      <SetApiKeyButton apiKey={apiKey} setApiKey={setApiKey} />
      <p className="text-sm font-medium my-4">Upload audio file</p>
      <div className="sm:flex sm:max-w-lg sm:mx-auto">
        <div className="mx-auto max-w-2xl sm:m-0">
          <Input type="file" onChange={handleFileChange} />
        </div>
        <div className="mt-6 sm:m-auto">
          <ConvertButton apiKey={apiKey} file={file} setText={setText} />
        </div>
      </div>
      <div className="w-4/5 mx-auto mt-10">
        <TextBox apiKey={apiKey} text={text} setText={setText} />
      </div>
    </div>
  );
};

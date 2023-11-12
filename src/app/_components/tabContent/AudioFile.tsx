import { FC, useState } from 'react';
import { ApiKeyProps } from '@/app/_types';
import { Input } from '@/components/ui/input';
import { SetApiKeyButton } from '../ui/SetApiKeyButton';
import { ConvertButton } from '../ui/ConvertButton';
import { TextBox } from '../ui/TextBox';

export const AudioFile: FC<ApiKeyProps> = ({ apiKey, setApiKey }) => {
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
      <p className="text-sm font-medium py-4">Upload audio file</p>
      <div className="mx-auto max-w-2xl">
        <Input type="file" onChange={handleFileChange} />
      </div>
      <div className="mt-6">
        <ConvertButton apiKey={apiKey} file={file} setFile={setFile} setText={setText} />
      </div>
      <div className="w-4/5 mx-auto mt-10">
        <TextBox text={text} />
      </div>
    </div>
  );
};

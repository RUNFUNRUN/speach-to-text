import { FC, useState } from 'react';
import { ApiKeyProps } from '@/app/_types';
import { SetApiKeyButton } from '../ui/SetApiKeyButton';
import { ConvertButton } from '../ui/ConvertButton';
import { TextBox } from '../ui/TextBox';
import { useRecord } from '@/app/_hooks/record';
import { Button } from '@/components/ui/button';

export const Recording: FC<ApiKeyProps> = ({ apiKey, setApiKey }) => {
  const [text, setText] = useState<string>('');
  const { file, startRecording, stopRecording, isAudio } = useRecord();

  const handleDownload = () => {
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="text-center">
      <SetApiKeyButton apiKey={apiKey} setApiKey={setApiKey} />
      <p className="text-sm font-medium my-4">Record audio</p>
      <div className="flex">
        <div className="ml-auto mr-4">
          {!isAudio ? (
            <Button size="icon" variant="secondary" onClick={startRecording}>
              <svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" viewBox="0 0 256 256">
                <g fill="#ff8888" fillRule="evenodd">
                  <path d="M128 226c-54.124 0-98-43.876-98-98s43.876-98 98-98s98 43.876 98 98s-43.876 98-98 98m-1-8c49.706 0 90-40.294 90-90s-40.294-90-90-90s-90 40.294-90 90s40.294 90 90 90"></path>
                  <path d="M128 197c-38.108 0-69-30.668-69-68.5S89.892 60 128 60c38.108 0 69 30.668 69 68.5S166.108 197 128 197m0-6.29c34.22 0 61.96-27.54 61.96-61.511c0-33.971-27.74-61.51-61.96-61.51s-61.96 27.539-61.96 61.51s27.74 61.51 61.96 61.51z"></path>
                  <path d="M128 170c-23.196 0-42-18.804-42-42s18.804-42 42-42s42 18.804 42 42s-18.804 42-42 42"></path>
                </g>
              </svg>
            </Button>
          ) : (
            <Button size="icon" variant="destructive" onClick={stopRecording}>
              <svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" viewBox="0 0 256 256">
                <path
                  fill="#ffffff"
                  fillRule="evenodd"
                  d="M32 64.001C32 46.328 46.333 32 64.001 32H192c17.672 0 32 14.333 32 32.001V192c0 17.672-14.333 32-32.001 32H64c-17.672 0-32-14.333-32-32.001V64z"
                ></path>
              </svg>
            </Button>
          )}
        </div>
        <div className="mr-auto">
          <Button size="sm" disabled={!file} onClick={handleDownload}>
            Download
          </Button>
        </div>
      </div>
      <div>
        <ConvertButton apiKey={apiKey} file={file} setText={setText} />
      </div>
      <div className="w-4/5 mx-auto mt-10">
        <TextBox text={text} />
      </div>
    </div>
  );
};

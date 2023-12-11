import { AlertInfo, FixButtonProps } from '@/app/_types';
import { Button } from '@/components/ui/button';
import { fixText } from '@/lib/openai';
import { Alert } from './Alert';
import { useState } from 'react';

export const FixButton = ({ apiKey, text, setText }: FixButtonProps) => {
  const [open, setOpen] = useState(false);
  const alert: AlertInfo = { title: 'something wrong', description: 'fix failed' };

  const handleFix = async () => {
    if (text === '') return;
    const newText = await fixText(apiKey, text);
    if (!newText) {
      setOpen(true);
    }
    setText(newText);
  };

  return (
    <>
      <Button size="sm" variant="secondary" onClick={handleFix}>
        Fix typos with AI
      </Button>
      <Alert info={alert} open={open} setOpen={setOpen} />
    </>
  );
};

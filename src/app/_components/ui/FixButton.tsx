import { AlertInfo, FixButtonProps } from '@/app/_types';
import { Button } from '@/components/ui/button';
import { fixText } from '@/lib/openai';
import { Alert } from './Alert';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export const FixButton = ({ apiKey, text, setText }: FixButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const alert: AlertInfo = { title: 'something wrong', description: 'fix failed' };

  const handleFix = async () => {
    if (text === '') return;
    setLoading(true);
    const newText = await fixText(apiKey, text);
    if (!newText) {
      setOpen(true);
      setLoading(false);
      return;
    }
    setText(newText);
    setLoading(false);
  };

  return (
    <>
      {!loading ? (
        <Button size="sm" className="w-36" variant="secondary" onClick={handleFix}>
          Fix typos with AI
        </Button>
      ) : (
        <Button size="sm" className="w-36" variant="secondary" onClick={handleFix}>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Fixing
        </Button>
      )}
      <Alert info={alert} open={open} setOpen={setOpen} />
    </>
  );
};

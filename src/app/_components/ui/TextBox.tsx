import { TextBoxProps } from '@/app/_types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CardContent, Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { FixButton } from './FixButton';

export const TextBox = ({ apiKey, text, setText }: TextBoxProps) => {
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    toast({
      description: 'Copied to clipboard!',
    });
  };

  return (
    <Card>
      <CardContent className="border p-4">
        <ScrollArea className="h-80 w-full rounded-md border">
          <div className="p-2 text-sm text-left">
            <p>{text}</p>
          </div>
        </ScrollArea>
        <div className="sm:flex sm:justify-between">
          <div className="mt-4">
            <FixButton apiKey={apiKey} text={text} setText={setText} />
          </div>
          <div className="mt-4">
            <Button size="sm" variant="outline" onClick={handleCopy}>
              Copy
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

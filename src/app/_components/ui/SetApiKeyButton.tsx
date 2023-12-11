import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ApiKeyProps } from '@/app/_types';

export const SetApiKeyButton = ({ apiKey, setApiKey }: ApiKeyProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [newApiKey, setNewApiKey] = useState<string>('');

  const displayApiKey = `${apiKey.substring(0, 3)} ... ${apiKey.substring(apiKey.length - 3)}`;

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setApiKey(newApiKey);
    localStorage.setItem('apiKey', newApiKey);
    setNewApiKey('');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Set API key</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Set API key</DialogTitle>
          <DialogDescription>Your API key is never stored on the server.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {apiKey ? (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Current API key
              </Label>
              <Input id="currentApiKey" value={displayApiKey} className="col-span-3" disabled />
            </div>
          ) : null}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              New API key
            </Label>
            <Input
              id="newApiKey"
              className="col-span-3"
              value={newApiKey}
              onChange={(e) => setNewApiKey(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

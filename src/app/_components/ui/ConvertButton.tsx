import { FC, useState } from 'react';
import { AlertInfo, ApiRes, ConvertButtonProps } from '@/app/_types';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Alert } from './Alert';

export const ConvertButton: FC<ConvertButtonProps> = ({ apiKey, file, setFile, setText }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertInfo>({ title: '', description: '' });

  const apiAlert = {
    title: 'API key is not set.',
    description: 'Please set your API key before converting.',
  };

  const fileSetAlert = {
    title: 'File is not set.',
    description: 'Please set your file before converting.',
  };

  const fileFormatAlert = {
    title: 'File format is not supported.',
    description: 'Please set your audio file(flac, mp3, mp4, mpeg, mpga, m4a, ogg, wav or webm).',
  };

  const fileSizeAlert = {
    title: 'File size is too large.',
    description: 'Please set your audio file that are less than 25 MB.',
  };

  const isFileLessThan25MB = (file: File): boolean => {
    const maxSizeInBytes = 25 * 1024 * 1024; // 25MB in bytes
    return file.size < maxSizeInBytes;
  };

  const fileFormats = ['flac', 'mp3', 'mp4', 'mpeg', 'mpga', 'm4a', 'ogg', 'wav', 'webm'];

  const checkFileFormat = (filename: string): boolean => {
    const extension = filename.split('.').pop()?.toLowerCase();
    return fileFormats.includes(extension ?? '');
  };

  const handleClick = async () => {
    if (!apiKey) {
      setAlert(apiAlert);
      setOpen(true);
      return;
    }

    if (!file) {
      setAlert(fileSetAlert);
      setOpen(true);
      return;
    }

    if (!file.type.includes('audio') || !checkFileFormat(file.name)) {
      setAlert(fileFormatAlert);
      setOpen(true);
      return;
    }

    if (!isFileLessThan25MB(file)) {
      setAlert(fileSizeAlert);
      setOpen(true);
      return;
    }

    setLoading(true);

    const formData = new FormData();

    formData.append('apiKey', apiKey);
    formData.append('file', file);

    console.log(formData);

    const res: ApiRes | void = await fetch('/api/convert', {
      method: 'POST',
      body: formData,
    })
      .then((res) => {
        if (res.status !== 200) {
          return;
        }
        return res.json();
      })
      .catch((err) => console.error(err));

    if (!res) {
      setAlert({ title: 'Something went wrong.', description: 'Please try again.' });
      setOpen(true);
      setLoading(false);
      return;
    }

    await setText(res.text);
    setLoading(false);
  };

  return (
    <>
      {!loading ? (
        <Button className="w-36" onClick={handleClick}>
          Convert
        </Button>
      ) : (
        <Button className="w-36" disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Converting...
        </Button>
      )}
      <Alert info={alert} open={open} setOpen={setOpen} />
    </>
  );
};

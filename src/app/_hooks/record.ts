import { useRef, useState } from 'react';

type Hooks = {
  file: File | undefined;
  startRecording: () => void;
  stopRecording: () => void;
  isAudio: boolean;
};

export const useRecord = (): Hooks => {
  const mediaRecorder = useRef<MediaRecorder | undefined>(undefined);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [isAudio, setIsAudio] = useState<boolean>(false);

  const handleDataAvailable = (event: BlobEvent) => {
    const file = new File([event.data], 'audio.webm', {
      type: event.data.type,
      lastModified: Date.now(),
    });
    setFile(file);
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);
    mediaRecorder.current.start();
    mediaRecorder.current.addEventListener('dataavailable', handleDataAvailable);
    setIsAudio(true);
  };

  const stopRecording = () => {
    mediaRecorder.current?.stop();
    setIsAudio(false);
  };

  return {
    file,
    startRecording,
    stopRecording,
    isAudio,
  };
};

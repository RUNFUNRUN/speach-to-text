export type ApiKeyProps = {
  apiKey: string;
  setApiKey: Dispatch<SetStateAction<string>>;
};

export type ConvertButtonProps = {
  apiKey: string;
  file: File | undefined;
  setText: Dispatch<SetStateAction<string>>;
};

export type AlertInfo = {
  title: string;
  description: string;
};

export type AlertProps = {
  info: AlertInfo;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export type TextBoxProps = {
  apiKey: string;
  text: string;
  setText: Dispatch<SetStateAction<string>>;
};

export type FixButtonProps = {
  apiKey: string;
  text: string;
  setText: Dispatch<SetStateAction<string>>;
};

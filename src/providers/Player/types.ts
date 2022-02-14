export enum Status {
  NOT_SET,
  READY,
  NOT_READY,
}

export interface SelectedFile {
  key: number;
  name: string;
  url: string;
  album: string;
  artist: string;
  title: string;
  cover: string;
  dominantColor: { r: number; g: number; b: number };
}

export interface ContextInterface {
  status: Status;
  selectedFile: SelectedFile;
  selectedFileChange: (key: number) => Promise<void>;
}

export interface ProviderInterface {
  children: React.ReactElement;
}

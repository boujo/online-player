import { useState, useMemo, useContext, createContext } from 'react';
import { getFileInfo } from '../../utils';
import {
  Status,
  SelectedFile,
  ContextInterface,
  ProviderInterface,
} from './types';

const PlaylerContext = createContext<ContextInterface>({
  status: Status.NOT_SET,
  selectedFile: {
    key: -1,
    name: '',
    url: '',
    album: '',
    artist: '',
    title: '',
    cover: '',
    dominantColor: { r: 0, g: 0, b: 0 },
  },
  selectedFileChange: (key) => {
    return new Promise((res, rej) => {
      res();
    });
  },
});

export function PlayerProvider({ children }: ProviderInterface) {
  const [status, setStatus] = useState<number>(Status.NOT_SET);
  const [selectedFile, setSelectedFile] = useState<SelectedFile>({
    key: -1,
    name: '',
    url: '',
    album: '',
    artist: '',
    title: '',
    cover: '',
    dominantColor: { r: 0, g: 0, b: 0 },
  });

  const value = useMemo<ContextInterface>(() => {
    async function selectedFileChange(key: number) {
      try {
        const fileInfo = await getFileInfo(key);
        setSelectedFile(fileInfo);
      } catch (err) {
        console.log(err);
      }
    }
    return { status, selectedFile, selectedFileChange };
  }, [selectedFile]);

  return (
    <PlaylerContext.Provider value={value}>{children}</PlaylerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlaylerContext);
  if (!context) {
    throw new Error(
      'for access usePlayer, component must wrap with PlayerProvider'
    );
  }

  return context;
}

import { useState, useEffect } from 'react';
import { getFilesListFromDirectory } from '../utils';

type ItemType = {
  key: number;
  path: string;
  name: string;
  artist: string;
  title: string;
  cover: string;
};

async function getList(
  openDB: any,
  deleteDB: any,
  setList: (items: Array<ItemType>) => void,
  setLoading: (loading: boolean) => void
) {
  try {
    const directoryHandle = await (window as any).showDirectoryPicker();
    const files = await getFilesListFromDirectory(directoryHandle, ['mp3']);

    await deleteDB('online-player');

    const db = await openDB('online-player', 1, {
      upgrade(db: any, oldVersion: any, newVersion: any, transaction: any) {
        const handlesStore = db.createObjectStore('handles', {
          autoIncrement: false,
        });
        const listStore = db.createObjectStore('list', { autoIncrement: true });
        const artistsStore = db.createObjectStore('artists', {
          autoIncrement: true,
        });
        const albumsStore = db.createObjectStore('albums', {
          autoIncrement: true,
        });
      },
    });

    {
      const storeName = 'handles';
      const tx = db.transaction(storeName, 'readwrite');
      const store = await tx.objectStore(storeName);
      const value = await store.put(directoryHandle, 'rootHandle');
      await tx.done;
    }

    const artists: { [key: string]: Array<number> } = {};
    const albums: {
      [key: string]: { cover: string; tracks: Array<number>; artist: string };
    } = {};
    {
      const storeName = 'list';
      // await db.put(storeName, { otherstuff: '...' }, 'somewhere/file.something');
      const tx = db.transaction(storeName, 'readwrite');
      const store = await tx.objectStore(storeName);
      for (let i = 0; i < files.length; i++) {
        // store track
        const value = await store.put(files[i]);

        // extract artist
        if (files[i].artist) {
          const artist = files[i].artist;
          if (!artists[artist]) {
            artists[artist] = [];
          }
          artists[artist].push(value);
        }

        // extract album
        if (files[i].album) {
          const albumName = files[i].album;
          if (!albums[albumName]) {
            albums[albumName] = {
              cover: files[i].cover,
              tracks: [],
              artist: '',
            };
          }
          albums[albumName].tracks.push(value);
          if (!albums[albumName].artist && files[i].artist) {
            albums[albumName].artist = files[i].artist;
          }
        }
      }
      await tx.done;
    }

    {
      const storeName = 'artists';
      const tx = db.transaction(storeName, 'readwrite');
      const store = await tx.objectStore(storeName);
      const artistKeys = Object.keys(artists);
      for (let i = 0; i < artistKeys.length; i++) {
        const artistData = {
          name: artistKeys[i],
          tracks: artists[artistKeys[i]],
        };
        const value = await store.put(artistData);
      }
      await tx.done;
    }

    {
      const storeName = 'albums';
      const tx = db.transaction(storeName, 'readwrite');
      const store = await tx.objectStore(storeName);
      const albumKeys = Object.keys(albums);
      for (let i = 0; i < albumKeys.length; i++) {
        const albumData = {
          name: albumKeys[i],
          cover: albums[albumKeys[i]].cover,
          tracks: albums[albumKeys[i]].tracks,
          artist: albums[albumKeys[i]].artist,
        };
        const value = await store.put(albumData);
      }
      await tx.done;
    }

    setList(files);
    setLoading(false);
  } catch (err) {
    console.log(err);
    setLoading(false);
  }
}

export function useFiles(openDB: any, deleteDB: any) {
  const [list, setList] = useState<Array<ItemType>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  function updateFiles() {
    setLoading(true);
    getList(openDB, deleteDB, setList, setLoading);
  }

  return { updateFiles, list, loading };
}

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getFilesListFromDirectory } from '../../utils';

export enum SongStatus {
  STOP,
  PLAY,
  PAUSE,
}

export type ItemType = {
  key: number;
  path: string;
  name: string;
  artist: string;
  title: string;
  cover: string;
};

export interface State {
  loading: boolean;
  list: Array<ItemType>;
}

const INITIAL_STATE: State = {
  loading: false,
  list: [],
};

export const initial = createAsyncThunk(
  'tracks/initial',
  async ({ openDB }: { openDB: any }) => {
    try {
      const storeName = 'list';
      const db = await openDB('online-player', 1);
      // const items = await db.getAll(storeName);
      const items = [];
      const keys = await db.getAllKeys(storeName);
      for (let i = 0; i < keys.length; i++) {
        const item = await db.get(storeName, keys[i]);
        items.push(item);
        items[i].key = keys[i];
      }

      return items;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
);

export const updateFiles = createAsyncThunk(
  'tracks/updateFiles',
  async ({ openDB, deleteDB }: { openDB: any; deleteDB: any }) => {
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

    return files || [];
  }
);

export const slice = createSlice({
  name: 'tracks',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initial.pending, (state) => {
        state.loading = true;
      })
      .addCase(initial.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload || [];
      })
      .addCase(updateFiles.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateFiles.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      });
  },
});

// export const { } = slice.actions;

export default slice.reducer;

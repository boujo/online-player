import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  getFilesListFromDirectory
} from '../../utils';

export enum SongStatus {
  STOP,
  PLAY,
  PAUSE
};

export interface State {
  loading : boolean,
  list    : []
};

const INITIAL_STATE: State = {
  loading : false,
  list    : []
};

export const initial = createAsyncThunk(
  'main/initial',
  async ({ openDB }) => {
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
  }
);

export const updateFiles = createAsyncThunk(
  'main/updateFiles',
  async ({ openDB, deleteDB }) => {
    const directoryHandle = await window.showDirectoryPicker();
    const files = await getFilesListFromDirectory(directoryHandle, ['mp3']);

    await deleteDB('online-player');

    const db = await openDB('online-player', 1, {
      upgrade(db, oldVersion, newVersion, transaction) {
        const handlesStore = db.createObjectStore('handles', { autoIncrement: false });
        const listStore = db.createObjectStore('list', { autoIncrement: true });
      }
    });

    {
      const storeName = 'handles';
      const tx = db.transaction(storeName, 'readwrite');
      const store = await tx.objectStore(storeName);
      const value = await store.put(directoryHandle, 'rootHandle');
      await tx.done;
    }

    {
      const storeName = 'list';
      // await db.put(storeName, { otherstuff: '...' }, 'somewhere/file.something');
      const tx = db.transaction(storeName, 'readwrite');
      const store = await tx.objectStore(storeName);
      for (let i = 0; i < files.length; i++) {
        const value = await store.put(files[i]);
      }
      await tx.done;
    }

    return files || [];
  }
);

export const slice = createSlice({
  name: 'main',
  initialState: INITIAL_STATE,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(initial.pending, (state) => {
        state.loading = true;
      })
      .addCase(initial.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
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
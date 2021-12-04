import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  getFilesListFromDirectory,
  readFileFromDirectory
} from '../../utils';

export enum SongStatus {
  STOP,
  PLAY,
  PAUSE
};

export interface State {
  loading       : boolean,
  list          : [],
  selectedIndex : number,
  selectedFile  : object
};

const INITIAL_STATE: State = {
  loading       : false,
  list          : [],
  selectedIndex : -1,
  selectedFile  : null
};

export const initial = createAsyncThunk(
  'main/initial',
  async ({ openDB }) => {
    const storeName = 'list';
    const db = await openDB('online-player', 1);
    const items = await db.getAll(storeName);
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

export const selectFile = createAsyncThunk(
  'main/selectFile',
  async ({ openDB, path, index }) => {
    // console.log(path)
    const storeName = 'handles';
    const db = await openDB('online-player', 1);
    const handle = await db.get(storeName, 'rootHandle');
    const file = await readFileFromDirectory(handle, path);

    return { file, index };
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
      })
      .addCase(selectFile.pending, (state) => {
        state.loading = true;
      })
      .addCase(selectFile.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedIndex = action.payload.index;
        state.selectedFile = action.payload.file;
      });
  },
});

// export const { } = slice.actions;

export default slice.reducer;
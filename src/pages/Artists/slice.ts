import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  getFilesListFromDirectory
} from '../../utils';

export enum SongStatus {
  STOP,
  PLAY,
  PAUSE
};

export type ArtistType = {
  key: number,
  name: string,
  tracks: Array<number>,
};

export interface State {
  loading : boolean,
  list    : Array<ArtistType>
};

const INITIAL_STATE: State = {
  loading : false,
  list    : []
};

export const initial = createAsyncThunk(
  'artists/initial',
  async ({ openDB }: { openDB: any }) => {
    try {
      const storeName = 'artists';
      const db = await openDB('online-player', 1);
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

export const slice = createSlice({
  name: 'artists',
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
        state.list = action.payload || [];
      });
  },
});

// export const { } = slice.actions;

export default slice.reducer;
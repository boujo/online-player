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
  'main/initial',
  async ({ openDB }: { openDB: any }) => {
    try {
      const db = await openDB('online-player', 1, {
        upgrade(db: any, oldVersion: any, newVersion: any, transaction: any) {
          const handlesStore = db.createObjectStore('handles', {
            autoIncrement: false,
          });
          const listStore = db.createObjectStore('list', {
            autoIncrement: true,
          });
          const artistsStore = db.createObjectStore('artists', {
            autoIncrement: true,
          });
          const albumsStore = db.createObjectStore('albums', {
            autoIncrement: true,
          });
        },
      });

      return [];
    } catch (err) {
      console.log(err);
      return [];
    }
  }
);

export const slice = createSlice({
  name: 'main',
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
      });
  },
});

// export const { } = slice.actions;

export default slice.reducer;

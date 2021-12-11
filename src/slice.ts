import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getFileInfo
} from './utils';

export enum Status {
  NOT_SET,
  READY,
  NOT_READY
};

export interface SelectedFile {
  key: number,
  name: string,
  url: string,
  album: string,
  artist: string,
  title: string,
  cover: string,
  dominantColor: { r: number, g: number, b: number },
}

export interface State {
  status: Status,
  selectedFile: SelectedFile,
};

const INITIAL_STATE: State = {
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
};

export const selectedFileChange = createAsyncThunk(
  'global/selectedFileChange',
  async ({ key }: { key: number }) => {
    try {
      const fileInfo = await getFileInfo(key);
      return fileInfo;
    } catch (err) {
      console.log(err);
    }
  }
);

export const slice = createSlice({
  name: 'global',
  initialState: INITIAL_STATE,
  reducers: {
    isReady: (state) => {
      state.status = Status.READY;
    },
    isNotReady: (state) => {
      state.status = Status.NOT_READY;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(selectedFileChange.pending, (state) => {
        // state.loading = true;
      })
      .addCase(selectedFileChange.fulfilled, (state, action) => {
        // state.loading = false;
        if (action.payload) {
          state.selectedFile = action.payload;
        }
      });
  },
});

export const { isReady, isNotReady } = slice.actions;

export default slice.reducer;
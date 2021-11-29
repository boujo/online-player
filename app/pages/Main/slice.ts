import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export enum SongStatus {
  STOP,
  PLAY,
  PAUSE
};

export interface State {
  loading     : boolean,
  currentSong : string,
  songStatus  : SongStatus
};

const INITIAL_STATE: State = {
  loading     : false,
  currentSong : "",
  songStatus  : SongStatus.STOP
};

export const initial = createAsyncThunk(
  'main/initial',
  async () => {
    return { };
  }
);

export const slice = createSlice({
  name: 'main',
  initialState: INITIAL_STATE,
  reducers: {
    currentSongChange: (state, action) => {
      state.currentSong = action.payload;
    },
    songStatusChange: (state, action) => {
      state.songStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initial.pending, (state) => {
        state.loading = true;
      })
      .addCase(initial.fulfilled, (state, action) => {
        state.loading    = false;
      });
  },
});

export const { currentSongChange, songStatusChange } = slice.actions;

export default slice.reducer;
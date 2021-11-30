import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export enum SongStatus {
  STOP,
  PLAY,
  PAUSE
};

export interface State {
  loading     : boolean
};

const INITIAL_STATE: State = {
  loading     : false
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

// export const { } = slice.actions;

export default slice.reducer;
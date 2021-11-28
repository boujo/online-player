import { createSlice } from '@reduxjs/toolkit';

export enum Status {
  NOT_SET,
  READY,
  NOT_READY
};

export interface State {
  status: Status
};

const INITIAL_STATE: State = {
  status: Status.NOT_SET
};

export const slice = createSlice({
  name: 'global',
  initialState: INITIAL_STATE,
  reducers: {
    isReady: (state) => {
      state.status = Status.READY;
    },
    isNotReady: (state) => {
      state.status = Status.NOT_READY;
    }
  },
});

export const { isReady, isNotReady } = slice.actions;

export default slice.reducer;
import { createSlice } from '@reduxjs/toolkit';

export enum Status {
  NOT_SET,
  READY,
  NOT_READY
};

export interface State {
  status: Status,
  selectedKey: number
};

const INITIAL_STATE: State = {
  status: Status.NOT_SET,
  selectedKey: 0
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
    },
    selectedKeyChange: (state, action) => {
      state.selectedKey = action.payload.key;
    },
  },
});

export const { isReady, isNotReady, selectedKeyChange } = slice.actions;

export default slice.reducer;
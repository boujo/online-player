import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import global from './slice';
import main from './pages/Main/slice';
import tracks from './pages/Tracks/slice';

export const store = configureStore({
  reducer: {
    global,
    main,
    tracks
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

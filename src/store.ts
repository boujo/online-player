import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import global from './slice';
import main from './pages/Main/slice';
import tracks from './pages/Tracks/slice';
import artists from './pages/Artists/slice';

export const store = configureStore({
  reducer: {
    global,
    main,
    tracks,
    artists
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

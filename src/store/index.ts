import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { authReducer } from '@/modules/auth/core/authSlice';
import { menuReducer } from '@/modules/menu/core/menuSlice';
import { rootSaga } from '@/store/rootSage';

const rootReducer = combineReducers({
  auth: authReducer,
  menu: menuReducer,
});

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
  reducer: rootReducer,
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

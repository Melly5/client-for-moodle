import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { baseApi } from "../services/api";

export const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: true }).concat(
      baseApi.middleware
    );
  },
});

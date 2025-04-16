import { configureStore } from "@reduxjs/toolkit";
import personalInfoReducer from "./personalInfoSlice";
import referencesReducer from "./referencesSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const personalInfopersistConfig = {
  key: "personalInfo",
  storage,
  version: 1,
};

const persistedPersonalInfoReducer = persistReducer(
  personalInfopersistConfig,
  personalInfoReducer
);
const persistedRefInfoReducer = persistReducer(
  personalInfopersistConfig,
  referencesReducer
);
export const store = configureStore({
  reducer: {
    personalInfo: persistedPersonalInfoReducer,
    references: persistedRefInfoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

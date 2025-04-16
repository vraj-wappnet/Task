import { configureStore } from "@reduxjs/toolkit";
import personalInfoReducer from "./personalInfoSlice";
import referencesReducer from "./referencesSlice";
import experienceReducer from "./experienceSlice";
import educationReducer from "./educationSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import skillsReducer from "./skillsSlice";

const personalInfoPersistConfig = {
  key: "personalInfo",
  storage,
  version: 1,
};

const referencesPersistConfig = {
  key: "references",
  storage,
  version: 1,
};

const experiencePersistConfig = {
  key: "experience",
  storage,
  version: 1,
};

const educationPersistConfig = {
  key: "education",
  storage,
  version: 1,
};

const skillsPersistConfig = {
  key: "skills",
  storage,
  version: 1,
};

// Persisted reducers
const persistedPersonalInfoReducer = persistReducer(
  personalInfoPersistConfig,
  personalInfoReducer
);

const persistedRefInfoReducer = persistReducer(
  referencesPersistConfig,
  referencesReducer
);

const persistedExperienceInfoReducer = persistReducer(
  experiencePersistConfig,
  experienceReducer
);

const persistedEducationReducer = persistReducer(
  educationPersistConfig,
  educationReducer
);

const persistedSkillsReducer = persistReducer(
  skillsPersistConfig,
  skillsReducer
);

export const store = configureStore({
  reducer: {
    personalInfo: persistedPersonalInfoReducer,
    references: persistedRefInfoReducer,
    experience: persistedExperienceInfoReducer,
    education: persistedEducationReducer,
    skills: persistedSkillsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

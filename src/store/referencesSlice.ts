import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Reference {
  id: string;
  name: string;
  relationship: string;
  company: string;
  contact: string;
}

interface ReferencesState {
  references: Reference[];
  skipReferences: boolean;
}

const initialState: ReferencesState = {
  references: [],
  skipReferences: false,
};

const referencesSlice = createSlice({
  name: "references",
  initialState,
  reducers: {
    setReferences: (state, action: PayloadAction<Reference[]>) => {
      state.references = action.payload;
    },
    setSkipReferences: (state, action: PayloadAction<boolean>) => {
      state.skipReferences = action.payload;
    },
    clearReferences: (state) => {
      state.references = [];
      state.skipReferences = false;
    },
  },
});

export const { setReferences, setSkipReferences, clearReferences } =
  referencesSlice.actions;
export type { Reference, ReferencesState };
export type ReferencesAction = ReturnType<
  (typeof referencesSlice.actions)[keyof typeof referencesSlice.actions]
>;
export default referencesSlice.reducer;

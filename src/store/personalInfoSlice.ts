import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  location: string;
  age: number | null;
  educationLevel: string;
}

const initialState: PersonalInfo = {
  fullName: "",
  email: "",
  phone: "",
  dob: "",
  gender: "",
  location: "",
  age: null,
  educationLevel: "",
};

const personalInfoSlice = createSlice({
  name: "personalInfo",
  initialState,
  reducers: {
    setPersonalInfo: (state, action: PayloadAction<PersonalInfo>) => {
      return action.payload;
    },
    clearPersonalInfo: () => initialState,
  },
});

export const { setPersonalInfo, clearPersonalInfo } = personalInfoSlice.actions;
export default personalInfoSlice.reducer;

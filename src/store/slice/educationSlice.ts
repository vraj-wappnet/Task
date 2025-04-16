import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Education {
  id: string;
  schoolName: string;
  degree: string;
  fieldOfStudy: string;
  startYear: string;
  endYear: string;
  grade: string;
  certificates: File[];
}

interface EducationState {
  educations: Education[];
}

const initialState: EducationState = {
  educations: [],
};

const educationSlice = createSlice({
  name: "education",
  initialState,
  reducers: {
    setEducations: (state, action: PayloadAction<Education[]>) => {
      state.educations = action.payload;
    },
    addEducation: (state, action: PayloadAction<Education>) => {
      state.educations.push(action.payload);
    },
    removeEducation: (state, action: PayloadAction<string>) => {
      state.educations = state.educations.filter(
        (edu) => edu.id !== action.payload
      );
    },
    clearEducations: () => initialState,
  },
});

export const { setEducations, addEducation, removeEducation, clearEducations } =
  educationSlice.actions;
export default educationSlice.reducer;

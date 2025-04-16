import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ExperienceInfo {
  id: string;
  jobTitle: string;
  companyName: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  responsibilities: string;
}

interface ExperienceState {
  experiences: ExperienceInfo[];
}

const initialState: ExperienceState = {
  experiences: [],
};

const experienceSlice = createSlice({
  name: "experienceInfo",
  initialState,
  reducers: {
    // Add or update an experience
    setExperienceInfo: (state, action: PayloadAction<ExperienceInfo>) => {
      const index = state.experiences.findIndex(
        (exp) => exp.id === action.payload.id
      );
      if (index >= 0) {
        state.experiences[index] = action.payload;
      } else {
        state.experiences.push(action.payload);
      }
    },
    clearExperienceInfo: () => initialState,

    removeExperienceInfo: (state, action: PayloadAction<string>) => {
      state.experiences = state.experiences.filter(
        (exp) => exp.id !== action.payload
      );
    },
  },
});

export const { setExperienceInfo, clearExperienceInfo, removeExperienceInfo } =
  experienceSlice.actions;
export default experienceSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Skill {
  id: string;
  name: string;
  isCustom: boolean;
  yearsOfExperience?: number;
}

interface SkillsState {
  skills: Skill[];
}

const initialState: SkillsState = {
  skills: [],
};

const skillsSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    setSkills: (state, action: PayloadAction<Skill[]>) => {
      state.skills = action.payload;
    },
    addSkill: (state, action: PayloadAction<Skill>) => {
      state.skills.push(action.payload);
    },
    removeSkill: (state, action: PayloadAction<string>) => {
      state.skills = state.skills.filter(
        (skill) => skill.id !== action.payload
      );
    },
    updateSkillExperience: (
      state,
      action: PayloadAction<{ id: string; yearsOfExperience: number }>
    ) => {
      const skill = state.skills.find((s) => s.id === action.payload.id);
      if (skill) {
        skill.yearsOfExperience = action.payload.yearsOfExperience;
      }
    },
    clearSkills: () => initialState,
  },
});

export const {
  setSkills,
  addSkill,
  removeSkill,
  updateSkillExperience,
  clearSkills,
} = skillsSlice.actions;
export default skillsSlice.reducer;

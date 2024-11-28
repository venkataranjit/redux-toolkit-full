import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  teachers: [],
  addTeacher: {},
  deleteTeacher: {},
  updateTeacher: {},
};

export const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    getTeachers: (state, action) => {
      state.teachers = [...action.payload];
    },
    addTeacher: (state, action) => {
      const newTeacher = { ...action.payload, id: uuidv4() };
      state.teachers.unshift(newTeacher);
      state.addTeacher = newTeacher;
    },
    deleteTeacher: (state, action) => {
      console.log(action.payload);
      state.deleteTeacher = state.teachers.find((t) => t.id === action.payload);
      state.teachers = state.teachers.filter((t) => t.id !== action.payload);
    },
    updateTeacher: (state, action) => {
      const { editID, teacherName, teacherQualification } = action.payload;
      const teacherIndex = state.teachers.findIndex((t) => t.id === editID);

      if (teacherIndex !== -1) {
        state.updateTeacher = {
          ...state.teachers[teacherIndex],
        };
        state.teachers[teacherIndex] = {
          ...state.teachers[teacherIndex],
          teacherName,
          teacherQualification,
        };
      }
    },
  },
});

export const { getTeachers, addTeacher, deleteTeacher, updateTeacher } =
  teacherSlice.actions;

export default teacherSlice.reducer;

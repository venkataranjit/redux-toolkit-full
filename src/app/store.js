import { configureStore } from "@reduxjs/toolkit";
import teacherReducer from "./teachersSlice";

const store = configureStore({
  reducer: {
    teacher: teacherReducer,
  },
});

export default store;

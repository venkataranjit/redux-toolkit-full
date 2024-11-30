import { configureStore } from "@reduxjs/toolkit";
import teacherReducer from "./teachersSlice";
import studentReducer from "./studentSlice";
import userReducer from "./usersSlice";

const store = configureStore({
  reducer: {
    teacher: teacherReducer,
    student: studentReducer,
    user: userReducer,
  },
});

export default store;

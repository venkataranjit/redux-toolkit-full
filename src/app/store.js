import { configureStore } from "@reduxjs/toolkit";
import hobbiesReducer from "../hobbies/hobbiesSlice";

const store = configureStore({
  reducer: {
    hobbies: hobbiesReducer,
  },
});

export default store;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  habbits: [
    {
      id: "",
      name: "",
      frequency: "",
    },
  ],
  addHabbit: {
    id: "",
    name: "",
    frequency: "",
  },
  editHabbit: {
    id: "",
    name: "",
    frequency: "",
  },
};

export const hobbiesSlice = createSlice({
  name: "hobbie",
  initialState,
  reducers: {
    addHobbies: (state) => {
      return state;
    },
  },
});

export const { addHobbies } = hobbiesSlice.actions;

export default hobbiesSlice.reducer;

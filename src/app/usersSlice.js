import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  users: [],
  isLoading: false,
  error: "",
};

export const registerUser = createAsyncThunk(
  "users/register",
  async (registrationDetails, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3002/users", {
        id: uuidv4(),
        ...registrationDetails,
      });
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// export const {} = usersSlice.actions;

export default usersSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  users: [],
  isLoading: false,
  error: "",
  loggedInUser: {},
};

export const registerUser = createAsyncThunk(
  "users/register",
  async (registrationDetails, { rejectWithValue }) => {
    try {
      const checkUserResponse = await axios.get("http://localhost:3002/users");
      if (
        checkUserResponse.data.some(
          (u) => u.email === registrationDetails.email
        )
      ) {
        throw new Error("User Already Registered");
      } else {
        const response = await axios.post("http://localhost:3002/users", {
          id: uuidv4(),
          ...registrationDetails,
        });
        return response.data;
      }
    } catch (e) {
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);

export const loginCheck = createAsyncThunk(
  "user/login",
  async (loginDetails, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3002/users");
      const user = response.data.find(
        (u) =>
          u.email.toLowerCase() === loginDetails.email.toLowerCase() &&
          u.password.toLowerCase() === loginDetails.password.toLowerCase()
      );
      if (!user) {
        throw new Error("UserDetails are Not Valid");
      }
      return user;
    } catch (e) {
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { fulfillWithValue }) => {
    try {
      return fulfillWithValue(null);
    } catch (e) {
      throw new Error("Failed to logout", e);
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
        state.error = "";
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.error = "";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(loginCheck.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(loginCheck.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.loggedInUser = action.payload;
      })
      .addCase(loginCheck.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.error = "";
        state.loggedInUser = "";
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// export const {} = usersSlice.actions;

export default usersSlice.reducer;

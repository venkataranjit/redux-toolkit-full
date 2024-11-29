import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  students: [],
  isLoading: false,
  error: null,
  isEdit: null,
  recentlyAddedStudent: {},
  recentlyEditedStudent: {},
  recentlyDeletedStudent: {},
};

export const getStudents = createAsyncThunk(
  "students/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3001/studentData");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addStudent = createAsyncThunk(
  "student/add",
  async (studentData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3001/studentData", {
        ...studentData,
        id: uuidv4(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteStudent = createAsyncThunk(
  "student/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/studentData/${id}`
      );

      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const editStudent = createAsyncThunk(
  "student/edit",
  async (studentData, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/studentData/${studentData.id}`,
        {
          ...studentData,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    isEditTeacherIndex: (state, action) => {
      state.isEdit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStudents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.students = action.payload;
      })
      .addCase(getStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.students.unshift(action.payload);
        state.recentlyAddedStudent = action.payload;
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        const deletedUser = state.students.find((s) => s.id === action.payload);
        state.recentlyDeletedStudent = deletedUser;
        state.students = state.students.filter((s) => s.id !== action.payload);
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(editStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isEdit = null;
        const studentIndex = state.students.findIndex(
          (s) => s.id === action.payload.id
        );

        state.recentlyEditedStudent = { ...state.students[studentIndex] };
        state.students[studentIndex] = action.payload;
        // state.recentlyEditedStudent = action.payload;
      })
      .addCase(editStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.isEdit = null;
        state.error = action.payload;
      });
  },
});

export const { isEditTeacherIndex } = studentSlice.actions;

export default studentSlice.reducer;

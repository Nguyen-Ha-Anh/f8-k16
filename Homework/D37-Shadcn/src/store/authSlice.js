import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "https://api.escuelajs.co/api/v1/auth/login",
        {
          email: data.email,
          password: data.password,
        }
      );

      return {
        tokens: res.data,
        email: data.email,
      };
    } catch (err) {
      console.log("error", err.response?.data);

      return rejectWithValue( "Login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    tokens: JSON.parse(localStorage.getItem("tokens")) || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.tokens = null;
      localStorage.removeItem('user');
      localStorage.removeItem('tokens');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(login.fulfilled, (state, action) => {
        (state.loading = false),
          (state.user = {
            name: action.payload.email.split("@")[0],
            email: action.payload.email,
          });
        state.tokens = action.payload.tokens;

        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("tokens", JSON.stringify(state.tokens));
      })
      .addCase(login.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

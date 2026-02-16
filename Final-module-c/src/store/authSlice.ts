import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { AUthState } from "@/types/AuthType";
import { getProfile } from "@/api/profile/profileAPI";

export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, thunkAPI) => {
    try {
      const res = await getProfile();
      console.log("FULL RESPONSE:", res);
      return res;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Profile failed",
      );
    }
  },
);

const initialState: AUthState = {
  profile: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.profile = null;
      state.error = null;
      state.loading = false;
    },
    logout: (state) => {
      state.profile = null;
      state.error = null;
      state.loading = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },

    updateFollowingCount: (state, action: PayloadAction<number>) => {
      if (state.profile) {
        state.profile.followingCount =
          (state.profile.followingCount ?? 0) + action.payload;
      }
    },

    updateFollowersCount: (state, action: PayloadAction<number>) => {
      if (state.profile) {
        state.profile.followersCount =
          (state.profile.followersCount ?? 0) + action.payload;
      }
    },

    setFollowCounts: (
      state,
      action: PayloadAction<{
        followersCount: number;
        followingCount: number;
      }>,
    ) => {
      if (!state.profile) return;

      state.profile.followersCount = action.payload.followersCount;
      state.profile.followingCount = action.payload.followingCount;
    },
  },

  extraReducers: (builder) => {
    builder
      //dang call API
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      //goi API thanh cong
      .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.profile = {
          ...state.profile,
          ...action.payload,
        };
        console.log("PAYLOAD:", action.payload);
      })
      //goi API that bai
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  clearProfile,
  logout,
  updateFollowersCount,
  updateFollowingCount,
  setFollowCounts
} = authSlice.actions;
export default authSlice.reducer;

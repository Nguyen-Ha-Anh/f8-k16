import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type FollowState = {
  followingMap: Record<string, boolean>;
};

const initialState: FollowState = {
  followingMap: {},
};

const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {
    setFollowing(
      state,
      action: PayloadAction<{ userId: string; value: boolean }>
    ) {
      state.followingMap[action.payload.userId] =
        action.payload.value;
    },
  },
});

export const { setFollowing } = followSlice.actions;
export default followSlice.reducer;

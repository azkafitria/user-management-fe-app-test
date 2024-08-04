import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isUserFieldChanged: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userFieldChangedAction(state, action) {
      state.isUserFieldChanged = action.payload;
    }
  }
});

export default userSlice.reducer;
export const { userFieldChangedAction } = userSlice.actions;

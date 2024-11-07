// chatSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface ChatState {
  isEmergency: boolean;
}

const initialState: ChatState = {
  isEmergency: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setIsEmergency(state, action) {
      state.isEmergency = action.payload;
    },
  },
});

export const { setIsEmergency } = chatSlice.actions;
export default chatSlice.reducer;

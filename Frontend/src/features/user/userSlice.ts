import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getUserProfile, updateUserProfile } from "../../services/UserService";
import { RootState } from '../../redux/store';

interface UserState {
  id: string | null;
  name: string;
  email: string;
  profile: any;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  id: null,
  name: "",
  email: "",
  profile: {},
  loading: false,
  error: null,
};

// Async thunk for fetching the user profile
export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.token; 
    if (token) {
      return await getUserProfile();
    }
    throw new Error('No token available');
  }
);


// Async thunk for updating the user profile
export const saveUserProfile = createAsyncThunk(
  'user/saveProfile',
  async (data: any, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.token;
    if (token) {
      return await updateUserProfile(data, token);
    }
    throw new Error('No token available');
  }
);
// Create an async thunk to fetch user details by ID
export const fetchUserInfoById = createAsyncThunk('user/fetchUserInfoById', async (userId) => {
  const response = await fetch(`/api/users/${userId}`); 
  const data = await response.json();
  return data; 
});


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ id: string; name: string; email: string }>) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    clearUser(state) {
      state.id = null;
      state.name = "";
      state.email = "";
      state.profile = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch user profile";
    });
    builder.addCase(saveUserProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(saveUserProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    });
    builder.addCase(saveUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to save user profile";
    });
    
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

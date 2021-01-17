import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLoginToken, validateLoginToken } from "../../api/loginApi";

interface LoginState {
  token: string,
  loading: 'idle' | 'pending' | 'succeeded' | 'failed',
  username: string,
  currentRequestId: any,
  error: any
  isTokenValid: boolean;
};

interface LoginArgs {
  username: string,
  password: string
};

interface VerifyArgs {
  token: string
};

const initialState = {
  token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
  isTokenValid: false,
  username: localStorage.getItem("username") ? localStorage.getItem("username") : "",
  loading: "idle",
  currentRequestId: undefined,
  error: null,
} as LoginState;


export const getToken = createAsyncThunk(
  "user/getToken",
  async (args: LoginArgs, thunkApi: any) => {
    const { userLogin: { currentRequestId, loading} } = thunkApi.getState() as any;
    if (loading !== "pending" || thunkApi.requestId !== currentRequestId) {
      return;
    }

    try {
      const response = await fetchLoginToken(args.username, args.password);
      return response.data;
    } catch (error) {
      return;
    }
  }
);

export const verfifyToken = createAsyncThunk(
  "user/verifyToken",
  async (args: VerifyArgs, thunkApi: any) => {
    const { userLogin: { currentRequestId, loading} } = thunkApi.getState() as any;
    if (loading !== "pending" || thunkApi.requestId !== currentRequestId) {
      return;
    }

    try {
      const response = await validateLoginToken(args.token);
      return response.data;
    } catch (error) {
      return;
    }
  }
);

export const loginSlice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.setItem("token", "");
      state.token = "";
      state.isTokenValid = false;
      state.username = "";
      localStorage.setItem("username", "");
    },
  },
  extraReducers: builder => {
    builder.addCase(getToken.fulfilled, (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === "pending" && state.currentRequestId === requestId) {
        state.loading = "idle";
        if (
          action.payload &&
          action.payload.token
        ) {
          state.token = action.payload.token;
          localStorage.setItem("token", action.payload.token);
          state.isTokenValid = true;
          state.username = action.payload.user_display_name;
          localStorage.setItem("username", action.payload.user_display_name);
        } else {
          state.token = "";
          localStorage.setItem("token", "");
          state.isTokenValid = false;
          state.username = "";
          localStorage.setItem("username", "");
        }
        state.currentRequestId = undefined;
      }
    })
    builder.addCase(getToken.pending, (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.currentRequestId = action.meta.requestId;
        state.token = "";
        localStorage.setItem("token", "");
        localStorage.setItem("username", "");
        state.username = "";
        state.isTokenValid = false;
      }
    })
    builder.addCase(getToken.rejected, (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === "pending" && state.currentRequestId === requestId) {
        state.loading = "idle";
        state.error = action.error;
        state.currentRequestId = undefined;
        state.token = "";
        localStorage.setItem("token", "");
        localStorage.setItem("username", "");
        state.username = "";
        state.isTokenValid = false;
      }
    })



    builder.addCase(verfifyToken.fulfilled, (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === "pending" && state.currentRequestId === requestId) {
        state.loading = "idle";
        if (action.payload === undefined) {
          state.token = "";
          localStorage.setItem("token", "");
          state.isTokenValid = false;
          state.username = "";
          localStorage.setItem("username", "");
        }
        state.currentRequestId = undefined;
      }
    })
    builder.addCase(verfifyToken.pending, (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.currentRequestId = action.meta.requestId;
        state.isTokenValid = false;
      }
    })
    builder.addCase(verfifyToken.rejected, (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === "pending" && state.currentRequestId === requestId) {
        state.loading = "idle";
        state.error = action.error;
        state.currentRequestId = undefined;
        state.token = "";
        localStorage.setItem("token", "");
        state.isTokenValid = false;
        state.username = "";
        localStorage.setItem("username", "");
      }
    })
  },
});

export const { logoutUser } = loginSlice.actions;

// The function below is called a selector and allows us to select a name from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.userLogin.username)`
export const selectUsername = (state: any) => state.userLogin.username;
export const selectToken = (state: any) => state.userLogin.token;
export const selectTokenIsValid = (state: any) => state.userLogin.isTokenValid;
export const selectLoading = (state: any) => state.userLogin.loading;
export const selectError = (state: any) => state.userLogin.error;

export default loginSlice.reducer;

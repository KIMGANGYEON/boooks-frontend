import { createSlice } from "@reduxjs/toolkit";
import {
  authUser,
  edittUser,
  joinUser,
  loginUser,
  logoutUser,
} from "./thunkFunctions";
import { toast } from "react-toastify";

const initialState = {
  userData: {
    id: "",
    email: "",
    name: "",
    role: 0,
  },
  isAuth: false,
  isLoading: false,
  isEdit: false,
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Join
      .addCase(joinUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(joinUser.fulfilled, (state) => {
        state.isLoading = false;
        toast.info("회원가입을 성공했습니다");
      })
      .addCase(joinUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      //Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
        state.isAuth = true;
        localStorage.setItem("accessToken", action.payload.accessToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      //Auth
      .addCase(authUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
        state.isAuth = true;
      })
      .addCase(authUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuth = false;
        localStorage.removeItem("accessToken");
      })

      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = initialState.userData;
        state.isAuth = false;
        localStorage.removeItem("accessToken");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      // Edit
      .addCase(edittUser.pending, (state) => {
        state.isEdit = false;
      })
      .addCase(edittUser.fulfilled, (state, action) => {
        state.isEdit = true;
        state.userData = action.payload;
        toast.info("회원정보 수정을 성공했습니다");
      })
      .addCase(edittUser.rejected, (state, action) => {
        state.isEdit = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export default userSlice.reducer;

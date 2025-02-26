import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Student_Id: "",
  Student_Name: "",
  Branch: "",
  Year: "",
  email: "",
  profile_pic: "",
  token: "",
};

export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setstudent: (state, action) => {
      state.Student_Id = action.payload.Student_Id;
      state.Student_Name = action.payload.Student_Name;
      state.Branch = action.payload.Branch;
      state.Year = action.payload.Year;
      state.email = action.payload.email;
      state.profile_pic = action.payload.profile_pic;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state, action) => {
      state.Student_Id = "";
      state.Student_Name = "";
      state.email = "";
      state.Year = "";
      state.Branch = "";
      state.profile_pic = "";
      state.token = "";
    },
  },
});

export const { setstudent, setToken, logout } = studentSlice.actions;

export default studentSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./StudentSlice";

const store = configureStore({
  reducer: {
    student: studentReducer,
  },
});

export default store;

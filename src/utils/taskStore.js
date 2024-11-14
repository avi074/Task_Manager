import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";
const taskStore = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

export default taskStore;

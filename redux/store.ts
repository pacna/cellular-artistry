// Redux
import { configureStore } from "@reduxjs/toolkit";
import commandReducer from "./reducers/command-slice";

export default configureStore({
  reducer: {
    command: commandReducer,
  },
});

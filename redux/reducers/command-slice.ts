// Redux
import { createSlice, Slice } from "@reduxjs/toolkit";

// Types
import { COMMAND } from "./../../components/types/customs/command.enum";

export const commandSlice: Slice<
  {
    value: COMMAND;
  },
  {
    setCommand: (
      state: {
        value: COMMAND;
      },
      action: {
        payload: any;
      }
    ) => void;
  },
  "command"
> = createSlice({
  name: "command",
  initialState: { value: COMMAND.resume as COMMAND },
  reducers: {
    setCommand: (state: { value: COMMAND }, action: { payload: any }): void => {
      state.value = action.payload;
    },
  },
});

export const { setCommand } = commandSlice.actions;

export default commandSlice.reducer;

import { createStyles, DefaultTheme, makeStyles } from "@mui/styles";

export const CellStyles = makeStyles((theme: DefaultTheme) =>
  createStyles({
    cell: {
      border: "1px solid black",
      height: "14px",
      width: "14px",
    },
    dead: {
      background: "#262626",
    },
    alive: {
      background: "white",
    },
  })
);

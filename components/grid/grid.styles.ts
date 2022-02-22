import { createStyles, makeStyles, DefaultTheme } from "@mui/styles";

export const GridStyles = makeStyles((theme: DefaultTheme) =>
  createStyles({
    grid: {
      backgroundColor: "white",
      maxWidth: "fit-content",
    },
    cellContainer: {
      display: "flex",
    },
  })
);

import { createStyles, makeStyles, DefaultTheme } from "@mui/styles";

export const GameOfLifeStyles = makeStyles((theme: DefaultTheme) =>
  createStyles({
    marginTop4vhSpacing: {
      marginTop: "4vh",
    },
    formContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "4vh",
    },
    formControl: {
      minWidth: 140,
      marginRight: "4vh",
    },
    center: {
      textAlign: "center",
    },
    hide: {
      display: "none",
    },
    gridContainer: {
      marginTop: "8vh",
      display: "flex",
      justifyContent: "center",
    },
  })
);

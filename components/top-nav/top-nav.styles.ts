import { createStyles, makeStyles, DefaultTheme } from "@mui/styles";

export const TopNavStyles = makeStyles((theme: DefaultTheme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
      textAlign: "center",
    },
  })
);

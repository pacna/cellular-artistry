import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const TopNavStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    background: {
        backgroundColor: '#C1472D'
    },
    title: {
      flexGrow: 1,
      textAlign: 'center'
    },
  }),
);
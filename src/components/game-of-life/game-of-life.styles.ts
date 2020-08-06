import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const GameOfLifeStyles = makeStyles((theme: Theme) =>
  createStyles({
    marginTop4vhSpacing: {
        marginTop: '4vh'
    },
    formContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '4vh'
    },
    formControl: {
      minWidth: 140,
      marginRight: '4vh'
    },
    center: {
        textAlign: 'center'
    },
    hide: {
      display: 'none'
    },
    gridContainer: {
        marginTop: '8vh',
        display: 'flex',
        justifyContent: 'center'
    }
  })
);
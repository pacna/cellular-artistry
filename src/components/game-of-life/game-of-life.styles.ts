import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const GameOfLifeStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonGroupSpacing: {
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
    select: {
      maxHeight: 140
    },
    center: {
        textAlign: 'center'
    },
    gridContainer: {
        marginTop: '8vh',
        display: 'flex',
        justifyContent: 'center'
    }
  })
);
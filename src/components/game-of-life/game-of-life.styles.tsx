import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const GameOfLifeStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonGroupSpacing: {
        marginTop: '4vh'
    },
    center: {
        textAlign: 'center'
    },
    gridSpacing: {
        marginTop: '8vh'
    }
  })
);
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const CellStyles = makeStyles((theme: Theme) =>
  createStyles({
    cell: {
        border: '1px solid black',
        height: '14px',
        width: '14px'
    },
    dead: {
      background: '#262626'
    },
    alive: {
      background: 'white'
    }
  })
);
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const CellStyles = makeStyles((theme: Theme) =>
  createStyles({
    cell: {
        border: '1px solid black',
        height: '12px',
        width: '12px'
    }
  })
);
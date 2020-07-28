import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const GridStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
        backgroundColor: 'white',
        maxWidth: 'fit-content',
        display: 'inline-flex'
    }
  })
);
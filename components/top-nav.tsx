// Mui
import { 
    AppBar,
    Toolbar,
    Typography 
} from '@mui/material';

// Styles
import classes from '../styles/top-nav.module.scss';

export const TopNav = (): JSX.Element => {
    return(
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    React Game of Life
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
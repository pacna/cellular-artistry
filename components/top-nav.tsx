// React
import React, { ReactElement } from 'react';

// Material UI
import { 
    AppBar,
    Toolbar,
    Typography 
} from '@mui/material';

// styles
import classes from '../styles/top-nav.module.scss';

export const TopNav = (): ReactElement => {
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
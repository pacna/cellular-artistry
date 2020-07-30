import React, { ReactElement } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { TopNavStyles } from './top-nav.styles';
import { IClasses } from './top-nav.interfaces';

export const TopNav = (): ReactElement => {
    const classes: IClasses = TopNavStyles();
    return(
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        REACT Game of Life
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}
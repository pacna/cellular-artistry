// React
import React, { ReactElement } from 'react';

// Material UI
import { 
    AppBar,
    Toolbar,
    Typography 
} from '@material-ui/core';

// Other
import { TopNavStyles } from './top-nav.styles';
import { IClasses } from './top-nav.interfaces';

export const TopNav = (): ReactElement => {
    const classes: IClasses = TopNavStyles();
    return(
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        React Game of Life
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}
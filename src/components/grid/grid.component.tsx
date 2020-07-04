import React from 'react';
import { GridStyles} from './grid.styles';

export const Grid = () => {
    const classes = GridStyles();
    return (
        <div className={classes.grid}>
            <div>HELLO WORLD</div>
        </div>
    )
}
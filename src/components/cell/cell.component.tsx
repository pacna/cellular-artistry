import React from 'react';
import { CellStyles } from './cell.styles';

export const Cell = () => {
    const classes = CellStyles();
    return(
        <div className={classes.cell}></div>
    )
}
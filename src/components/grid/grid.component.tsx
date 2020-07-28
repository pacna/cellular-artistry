import React from 'react';
import { GridStyles} from './grid.styles';
import { Cell } from '../cell/cell.component';

export const Grid = () => {
    const classes = GridStyles();
    return (
        <div className={classes.grid}>
            <Cell />
            <Cell />
            <Cell />
        </div>
    )
}
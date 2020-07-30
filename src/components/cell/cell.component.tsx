import React, { useState, ReactElement } from 'react';
import { CellStyles } from './cell.styles';
import { ICell, IClasses } from './cell.interfaces';

enum CELLSTATE {
    alive = 1, 
    dead = 0
}

export const Cell = (props: ICell): ReactElement => {
    const [cellState, setCellState] = useState(props.cellState);

    const {
        alive,
        dead
    } = CELLSTATE;
    
    const changeCellState = (): void => {
        if(cellState === alive) {
            setCellState(dead);
        } else {
            setCellState(alive);
        }
    }

    const classes: IClasses = CellStyles();

    return(
        <div
            onClick={changeCellState}
            className={`${classes.cell} ${cellState === alive ? classes.alive : classes.dead}`}>
        </div>
    )
}
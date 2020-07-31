import React, { useState, useEffect, ReactElement } from 'react';
import { CellStyles } from './cell.styles';
import { ICell, IClasses } from './cell.interfaces';

enum CELLSTATE {
    alive = 1, 
    dead = 0
}

export const Cell = (props: ICell): ReactElement => {
    const [cellState, setCellState] = useState(props.cellState);
    
    const changeCellState = (): void => {
        props.setCommand(''); // clear out any existing command
        if(cellState === CELLSTATE.alive) {
            setCellState(CELLSTATE.dead);
        } else {
            setCellState(CELLSTATE.alive);
        }
    }

    const classes: IClasses = CellStyles();

    const updateCellBackgroundColor = (cellState: number): any => {
        return cellState === CELLSTATE.alive ? classes.alive : classes.dead
    }

    useEffect(() => {
        if(props.command === 'clear') {
            setCellState(CELLSTATE.dead);
        }   
    }, [props.command]);

    return(
        <div
            onClick={changeCellState}
            className={`${classes.cell} ${updateCellBackgroundColor(cellState)}`}>
        </div>
    )
}
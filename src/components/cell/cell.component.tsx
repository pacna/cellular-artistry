import React, { useState, useEffect, ReactElement } from 'react';
import { CellStyles } from './cell.styles';
import { ICell, IClasses } from './cell.interfaces';
import { COMMAND } from '../game-of-life/game-of-life.component';

export enum CELLSTATE {
    alive = 1, 
    dead = 0
}

export const Cell = (props: ICell): ReactElement => {
    const [cellState, setCellState] = useState(props.cellState);
    
    const changeCellState = (): void => {
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
        if (props.generation[props.row][props.column] !== cellState && props.command !== COMMAND.paused) {
            setCellState(props.generation[props.row][props.column]);
        }   
    }, [props.command, props.generation, props.row, props.column, cellState]);

    return(
        <div
            onClick={changeCellState}
            className={`${classes.cell} ${updateCellBackgroundColor(cellState)}`}>
        </div>
    )
}
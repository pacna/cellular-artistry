import React, { useState, useEffect, ReactElement } from 'react';
import { CellStyles } from './cell.styles';
import { ICell, IClasses } from './cell.interfaces';
import { COMMAND } from '../game-of-life/game-of-life.component';

export enum CELLSTATE {
    alive = 1, 
    dead = 0
}
let copyGeneration: number[][];

export const Cell = (props: ICell): ReactElement => {
    const [cellState, setCellState] = useState(props.cellState);
    
    const changeCellState = (): void => {
        if(cellState === CELLSTATE.alive) { 
            copyGeneration[props.row][props.column] = CELLSTATE.dead;
            props.setGeneration(copyGeneration);
        } else {
            copyGeneration[props.row][props.column] = CELLSTATE.alive;
            props.setGeneration(copyGeneration);
        }
    }

    const classes: IClasses = CellStyles();

    const updateCellBackgroundColor = (cellState: number): any => {
        return cellState === CELLSTATE.alive ? classes.alive : classes.dead
    }

    useEffect(() => {
        copyGeneration = props.generation.map((x: number[]) => x);
        if (props.command === COMMAND.pause) {
            props.setCommand(COMMAND.resume);
        } else {
            setCellState(copyGeneration[props.row][props.column]);
        }
    }, [props, props.command, props.generation, props.row, props.column]);

    return(
        <div
            onClick={changeCellState}
            className={`${classes.cell} ${updateCellBackgroundColor(cellState)}`}>
        </div>
    )
}
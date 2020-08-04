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
        const copyGeneration: number[][] = props.generation.map((x: number[]) => x); 
        if (props.command === COMMAND.paused) {
            props.setCommand(COMMAND.resume);
        }
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
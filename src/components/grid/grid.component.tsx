import React, { ReactElement } from 'react';
import { GridStyles} from './grid.styles';
import { Cell } from '../cell/cell.component';
import { IGrid, IClasses } from './grid.interfaces';

export const Grid = (props: IGrid) => {
    const classes: IClasses = GridStyles();
    const createGrid = (initalCells: number[][]): ReactElement => {
        return (
            <div className={classes.grid}>
                {
                    initalCells.map((cells: number[], i: number) => {
                        return(
                            <div className={classes.cellContainer} key={i}>
                                {
                                    cells.map((cellState: number, j: number) => {
                                        return (
                                            <Cell key={j}/>
                                        )
                                    })
                                }
                            </div>
                        );
                    })
                }
            </div>
        )
    }
    return (
        <div>
            {   
                createGrid(props.cellsInitialRandomState)
            }
        </div>
    )
}
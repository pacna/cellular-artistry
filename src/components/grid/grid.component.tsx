import React, { ReactElement } from 'react';
import { GridStyles} from './grid.styles';
import { Cell } from '../cell/cell.component';
import { IGrid, IClasses } from './grid.interfaces';

export const Grid = (props: IGrid): ReactElement => {
    const classes: IClasses = GridStyles();

    const createGrid = (generation: number[][]): ReactElement => {
        return (
            <div className={classes.grid}>
                {
                    generation.map((cells: number[], i: number) => {
                        return(
                            <div className={classes.cellContainer} key={i}>
                                {
                                    cells.map((cellState: number, j: number) => {
                                        return (
                                            <Cell 
                                                cellState={cellState} 
                                                key={j}
                                                command={props.command}
                                                setCommand={props.setCommand}
                                                generation={generation}
                                                row={i}
                                                column={j}
                                            />
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
                createGrid(props.generation)
            }
        </div>
    )
}
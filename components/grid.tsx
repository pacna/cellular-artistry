// React
import React, { ReactElement } from 'react';

// Other
import { Cell } from './cell';
import { GridConfig } from './types/configs/grid-config';

// styles
import classes from '../styles/grid.module.scss';

export const Grid = (props: GridConfig): ReactElement => {

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
                                                setGeneration={props.setGeneration}
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
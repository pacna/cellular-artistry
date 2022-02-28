// Components
import { Cell } from './cell';

// Types
import { GridConfig } from './types/configs/grid-config';
import { CELLSTATE } from './types';

// Styles
import classes from '../styles/grid.module.scss';

export const Grid = (props: GridConfig): JSX.Element => {
    const { generation } = props;

    const updateCellState = (newCellState: CELLSTATE, xPos: number, yPos: number): void => {
        generation[xPos][yPos] = newCellState;
    }

    const createGrid = (generation: CELLSTATE[][]): JSX.Element => {
        return (
            <div className={classes.grid}>
                {
                    generation.map((cells: CELLSTATE[], rowIndex: number) => {
                        return(
                            <div className={classes.cellContainer} key={rowIndex}>
                                {
                                    cells.map((cellState: CELLSTATE, columnIndex: number) => {
                                        return (
                                            <Cell 
                                                state={cellState}
                                                updateCellState={updateCellState} 
                                                key={columnIndex}
                                                xPos={rowIndex}
                                                yPos={columnIndex}
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
                createGrid(generation)
            }
        </div>
    )
}
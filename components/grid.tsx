// Other
import { Cell } from './cell';
import { GridConfig } from './types/configs/grid-config';

// Styles
import classes from '../styles/grid.module.scss';

export const Grid = (props: GridConfig): JSX.Element => {
    const { generation, setGeneration } = props;

    const createGrid = (generation: number[][]): JSX.Element => {
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
                                                generation={generation}
                                                setGeneration={setGeneration}
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
                createGrid(generation)
            }
        </div>
    )
}
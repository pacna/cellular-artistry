// React
import React, { 
    useState, 
    useEffect 
} from 'react';

// Other
import { CellConfig} from './types/configs/cell-config';

// styles
import classes from '../styles/cell.module.scss';
import { CELLSTATE, COMMAND } from './types/customs';

let copyGeneration: number[][];

export const Cell = (props: CellConfig): JSX.Element => {
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

    const updateCellBackgroundColor = (cellState: number): string => {
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
// React
import { 
    useState, 
    useEffect 
} from 'react';

// Types
import { CellConfig} from './types/configs/cell-config';
import { CELLSTATE } from './types/customs';

// Styles
import classes from '../styles/cell.module.scss';

export const Cell = (props: CellConfig): JSX.Element => {
    const { state, xPos, yPos, updateCellState } = props;
    const [cellState, setCellState] = useState(state);

    const changeCellState = (): void => {
        if(cellState === CELLSTATE.alive) { 
            setCellState(CELLSTATE.dead);
            updateCellState(CELLSTATE.dead, xPos, yPos);
        } else {
            setCellState(CELLSTATE.alive);
            updateCellState(CELLSTATE.alive, xPos, yPos);
        }
    }

    const updateCellBackgroundColor = (cellState: number): string => {
        return cellState === CELLSTATE.alive ? classes.alive : classes.dead
    }


    useEffect(() => {
        setCellState(props.state);
    }, [props, props.state])

    return(
        <div
            onClick={changeCellState}
            className={`${classes.cell} ${updateCellBackgroundColor(cellState)}`}>
        </div>
    )
}
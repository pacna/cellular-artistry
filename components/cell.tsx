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
    const { state, coordinate, updateCellState } = props;
    const [cellState, setCellState] = useState<CELLSTATE>(state);

    const changeCellState = (): void => {
        if (cellState === CELLSTATE.alive) { 
            setCellState(CELLSTATE.dead);
            updateCellState(CELLSTATE.dead, coordinate);
        } else {
            setCellState(CELLSTATE.alive);
            updateCellState(CELLSTATE.alive, coordinate);
        }
    }

    const updateCellBackgroundColor = (cellState: number): string => {
        return cellState === CELLSTATE.alive ? classes.alive : classes.dead
    }


    useEffect(() => {
        setCellState(state);
    }, [props, state])

    return(
        <div
            onClick={changeCellState}
            className={`${classes.cell} ${updateCellBackgroundColor(cellState)}`}>
        </div>
    )
}
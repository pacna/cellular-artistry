// React
import { 
    useState, 
    useEffect 
} from 'react';

// Types
import { CellConfig} from './types/configs/cell-config';
import { CELLSTATE, COMMAND } from './types/customs';

// Styles
import classes from '../styles/cell.module.scss';

// Redux
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { setCommand } from '../redux/reducers/command-slice';

let copyGeneration: number[][];

export const Cell = (props: CellConfig): JSX.Element => {
    const command = useSelector((state: RootStateOrAny) => state.command.value);
    const [cellState, setCellState] = useState(props.cellState);
    const dispatch = useDispatch();
    
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
        if (command === COMMAND.pause) {
            dispatch(setCommand(COMMAND.resume));
        } else {
            setCellState(copyGeneration[props.row][props.column]);
        }
    }, [props, props.generation, props.row, props.column]);

    return(
        <div
            onClick={changeCellState}
            className={`${classes.cell} ${updateCellBackgroundColor(cellState)}`}>
        </div>
    )
}
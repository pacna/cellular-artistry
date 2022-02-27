// React
import React, { 
    ReactElement, 
    useState, 
    useEffect
} from 'react';

// Components
import { Grid } from './grid';
import { GridFormManagement } from './grid-form-management';
import { GameOfLifeActions } from './game-of-life-actions';

// Types
import { CELLSTATE, COMMAND, STATUS } from './types/customs';

// Styles
import classes from '../styles/game-of-life.module.scss';

// Redux
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { setCommand } from '../redux/reducers/command-slice';

// needs to be set outside the functional component to clear the setTimeout on time.
let loop: any;

export const GameOfLife = (): ReactElement => {
    const command = useSelector((state: RootStateOrAny) => state.command.value);
    const [status, setStatus] = useState<STATUS>(STATUS.on);
    const [disabled, setDisabled] = useState<boolean>(true);
    const [row, setRow] = useState<number>(0);
    const [column, setColumn] = useState<number>(0);
    const [generation, setGeneration] = useState<number[][]>([] as number[][])
    const dispatch = useDispatch();

    const clearGrid = (): void => {
        const emptyGeneration: number[][] = noSurvivors();
        setGeneration(emptyGeneration);
        dispatch(setCommand(COMMAND.pause));
        setStatus(STATUS.on);
    }

    const noSurvivors = (): number[][] => {
        const deadGeneration: number[][] = generation.map((cells: number[]) => {
            return cells.map(() => CELLSTATE.dead);
        })

        return deadGeneration;
    }
    
    const generateGrid = (): void => {
        createGrid();
        if(disabled) {// no need to set it to false every time.
            setDisabled(false);
        }

    }

    const createGrid = (): void => {
        let firstGeneration: number[][] = [];
        for(let i = 0; i < row; i++) {
            firstGeneration.push([]);
            for(let j = 0; j < column; j++) {
                firstGeneration[i].push(setRandomCellState());
            }
        }

        setGeneration(firstGeneration);
    }

    const setRandomCellState = (): number => {
        return Math.round(Math.random()) // return either 0 or 1
    }

    const nextGeneration = (): void => {
        if (command === COMMAND.pause) {
            return;
        }

        const nextGeneration: number[][] = generation.map((cells: number[], rowIndex: number) => {
            return cells.map((cell: number, columnIndex: number) => {

                // neighbors: LEFT, RIGHT, TOP, DOWN, TOP LEFT, TOP RIGHT, BOTTOM LEFT, BOTTOM RIGHT
                const neighborOffsets: number[][] = [
                    [-1, 0],
                    [1, 0],
                    [0, -1],
                    [0, 1],
                    [-1, -1],
                    [-1, 1],
                    [1, -1],
                    [1, 1],
                ];
    
                let aliveCount: number = 0;

                for(const neighborOffset of neighborOffsets) {
                    let neighborXPos: number = rowIndex + neighborOffset[0];
                    let neighborYPos: number = columnIndex + neighborOffset[1];

                    if (isWithinRange(neighborXPos, neighborYPos) && generation[neighborXPos][neighborYPos] === CELLSTATE.alive) {
                        aliveCount++;
                    }
                }

                return applyGameOfLifeRules(aliveCount, cell);
            })
        })

        setGeneration(nextGeneration);
    }

    const applyGameOfLifeRules = (aliveCount: number, cell: number): number => {
        if (cell === CELLSTATE.alive) {
            if (aliveCount === 2 || aliveCount === 3) {
                return CELLSTATE.alive;
            } else {
                return CELLSTATE.dead;
            }
        } else {
            if (aliveCount === 3) {
                return CELLSTATE.alive;
            } else {
                return CELLSTATE.dead;
            }
        }
    }

    const isWithinRange = (xPos: number, yPos: number): boolean => {
        return (xPos >= 0 && xPos < row) && (yPos >= 0 && yPos < column);
    }

    const play = (): void => {
        dispatch(setCommand(COMMAND.resume));
        setStatus(STATUS.on);
        nextGeneration();
    }

    const playGlider = (): void => {
        if (command === COMMAND.play) {// if it's already playing then do nothing
            return;
        }
        const deadGeneration: number[][] = noSurvivors();
        const copyGeneration: number[][] = deadGeneration.map((x: number[]) => x);
        copyGeneration[0][1] = CELLSTATE.alive;
        copyGeneration[1][2] = CELLSTATE.alive;
        copyGeneration[2][0] = CELLSTATE.alive;
        copyGeneration[2][1] = CELLSTATE.alive;
        copyGeneration[2][2] = CELLSTATE.alive;
        
        setGeneration(copyGeneration);
        dispatch(setCommand(COMMAND.play));
        setStatus(STATUS.off);
    }

    const handleStatus = (status: number): void => {
        if (status === STATUS.on) {
            setStatus(STATUS.off); // to show it's paused in the UI
            dispatch(setCommand(COMMAND.play));
        } else {
            setStatus(STATUS.on);
            dispatch(setCommand(COMMAND.pause));
        }
    }

    const displayActions = (): JSX.Element => {
        if (disabled) {
            return(
                <GridFormManagement
                    setRow={setRow}
                    setColumn={setColumn}
                    generateGrid={generateGrid} 
                />
            )
        }

        return(
            <GameOfLifeActions
                clearGrid={clearGrid}
                play={play}
                playGlider={playGlider}
                handleStatus={handleStatus}
                status={status}
             />
        )
    }

    useEffect(() => {
        switch(command) {
            case COMMAND.play:
                loop = setTimeout(() => {
                    nextGeneration();
                }, 500);
                break;
            case COMMAND.pause:
                clearTimeout(loop);
                break;
            case COMMAND.resume:
                break;
            default:
                break;
        }
    }, [command, nextGeneration])

    return(
        <div className={classes.gameOfLife}>
            { displayActions() }
            <div className={classes.gridContainer}>
                <Grid 
                    generation={generation}
                    setGeneration={setGeneration}
                    />
            </div>
        </div>
    )
}
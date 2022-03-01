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
import { CellCoordinate, CELLSTATE, COMMAND, STATUS } from './types/customs';

// Styles
import classes from '../styles/game-of-life.module.scss';

// Redux
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { setCommand } from '../redux/reducers/command-slice';

export const GameOfLife = (): ReactElement => {
    const command = useSelector((state: RootStateOrAny) => state.command.value);
    const [status, setStatus] = useState<STATUS>(STATUS.on);
    const [disabled, setDisabled] = useState<boolean>(true);
    const [row, setRow] = useState<number>(0);
    const [column, setColumn] = useState<number>(0);
    const [generation, setGeneration] = useState<CELLSTATE[][]>([] as CELLSTATE[][])
    const [generationCounter, setGenerationCounter] = useState<number>(0);
    const dispatch = useDispatch();

    const clearGrid = (): void => {
        const emptyGeneration: CELLSTATE[][] = noSurvivors();
        setGeneration(emptyGeneration);
        dispatch(setCommand(COMMAND.resume));
        setStatus(STATUS.on);
    }

    const noSurvivors = (): CELLSTATE[][] => {
        const deadGeneration: CELLSTATE[][] = generation.map((cells: CELLSTATE[]) => {
            return cells.map(() => CELLSTATE.dead);
        })

        return deadGeneration;
    }
    
    const generateGrid = (): void => {
        createGrid();
        setDisabled(false);
    }

    const createGrid = (): void => {
        let firstGeneration: CELLSTATE[][] = [];
        for (let i = 0; i < row; i++) {
            firstGeneration.push([]);
            for (let j = 0; j < column; j++) {
                firstGeneration[i].push(generateRandomCellState());
            }
        }

        setGeneration(firstGeneration);
    }

    const generateRandomCellState = (): CELLSTATE => {
        return Math.round(Math.random()) as CELLSTATE
    }

    const nextGeneration = (): void => {
        if (command === COMMAND.pause) {
            return;
        }

        // neighbors: LEFT, RIGHT, TOP, DOWN, TOP LEFT, TOP RIGHT, BOTTOM LEFT, BOTTOM RIGHT
        const neighborOffsets: CellCoordinate[] = [
            { xPos: -1, yPos: 0},
            { xPos: 1, yPos: 0},
            { xPos: 0, yPos: -1},
            { xPos: 0, yPos: 1},
            { xPos: -1, yPos: -1},
            { xPos: -1, yPos: 1},
            { xPos: 1, yPos: -1},
            { xPos: 1, yPos: 1},
        ];

        const nextGeneration: CELLSTATE[][] = generation.map((cells: CELLSTATE[], rowIndex: number) => {
            return cells.map((cell: CELLSTATE, columnIndex: number) => {
    
                let aliveCount: number = 0;

                for (const neighborOffset of neighborOffsets) {
                    let neighborXPos: number = rowIndex + neighborOffset.xPos;
                    let neighborYPos: number = columnIndex + neighborOffset.yPos;

                    if (isWithinRange(neighborXPos, neighborYPos) && generation[neighborXPos][neighborYPos] === CELLSTATE.alive) {
                        aliveCount++;
                    }
                }

                return applyGameOfLifeRules(aliveCount, cell);
            })
        })

        setGenerationCounter(generationCounter + 1);
        setGeneration(nextGeneration);
    }

    const applyGameOfLifeRules = (aliveCount: number, cell: number): number => {
        if (cell === CELLSTATE.alive) {
            return (aliveCount === 2 || aliveCount === 3) ? CELLSTATE.alive : CELLSTATE.dead; 
        } else {
            return (aliveCount === 3) ? CELLSTATE.alive : CELLSTATE.dead;
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
        const singleGliderGeneration: CELLSTATE[][] = noSurvivors();

        // show glider on the left side if it's even generation
        // show glider on the right side if it's old generation
        if (generationCounter % 2 === 0) {
            singleGliderGeneration[0][1] = CELLSTATE.alive;
            singleGliderGeneration[1][2] = CELLSTATE.alive;
            singleGliderGeneration[2][0] = CELLSTATE.alive;
            singleGliderGeneration[2][1] = CELLSTATE.alive;
            singleGliderGeneration[2][2] = CELLSTATE.alive;
        } else  {
            const rightEndSide: number = column - 1;
            singleGliderGeneration[0][rightEndSide - 1] = CELLSTATE.alive;
            singleGliderGeneration[1][rightEndSide - 2] = CELLSTATE.alive;
            singleGliderGeneration[2][rightEndSide] = CELLSTATE.alive;
            singleGliderGeneration[2][rightEndSide - 1] = CELLSTATE.alive;
            singleGliderGeneration[2][rightEndSide - 2] = CELLSTATE.alive;   
        }
        
        setGeneration(singleGliderGeneration);

        if (command === COMMAND.play) {// if it's already playing then do nothing
            return;
        }

        dispatch(setCommand(COMMAND.play));
        setStatus(STATUS.off);
    }

    const handleStatus = (status: number): void => {
        if (status === STATUS.on) {
            setStatus(STATUS.off);
            dispatch(setCommand(COMMAND.play));
        } else {
            setStatus(STATUS.on);
            dispatch(setCommand(COMMAND.resume));
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


    const displayGrid = (): JSX.Element | void => {
        if (disabled) {
            return;
        }

        return (
            <div className={classes.gridContainer}>
                <h3> Generation { generationCounter } </h3>
                <Grid 
                    generation={generation}
                    />
            </div>
        )
    }

    useEffect(() => {
        let loop = setTimeout(() => {
            switch(command) {
                case COMMAND.play:
                    nextGeneration();
                    break;
                case COMMAND.pause:
                case COMMAND.resume:
                default:
                    break;
            }
        }, 500)

        return () => clearTimeout(loop);
    }, [command, nextGeneration])

    return(
        <div className={classes.gameOfLife}>
            { displayActions() }
            { displayGrid() }
        </div>
    )
}
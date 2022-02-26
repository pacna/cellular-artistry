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

// needs to be set outside the functional component to clear the setTimeout on time.
let autoGeneration: any;

export const GameOfLife = (): ReactElement => {
    const [command, setCommand] = useState('');
    const [status, setStatus] = useState<STATUS>(STATUS.on);
    const [disabled, setDisabled] = useState<boolean>(true);
    const [row, setRow] = useState<number>(0);
    const [column, setColumn] = useState<number>(0);
    const [generation, setGeneration] = useState([] as number[][])

    const clearGrid = (): void => {
        const emptyGeneration: number[][] = noSurvivors();
        setGeneration(emptyGeneration);
        setCommand(COMMAND.pause);
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

        const nextGeneration: number[][] = generation.map((cells: number[], i: number) => {
            return cells.map((cell: number, j: number) => {
                let aliveCount: number = 0;

                // left neighbor
                if (isWithinRange(i, j-1)) {
                    const leftNeighbor: number = generation[i][j-1];
                    if (leftNeighbor === CELLSTATE.alive) {
                        aliveCount++;
                    }
                }
                // right neighbor
                if (isWithinRange(i, j+1)) {
                    const rightNeighbor: number = generation[i][j+1];
                    if(rightNeighbor === CELLSTATE.alive) {
                        aliveCount++;
                    }
                }
                // top neighbor
                if (isWithinRange(i-1, j)) {
                    const topNeighbor: number = generation[i-1][j];
                    if(topNeighbor === CELLSTATE.alive) {
                        aliveCount++;
                    }
                }
                // down neighbor
                if (isWithinRange(i+1, j)) {
                    const downNeighbor: number = generation[i+1][j];
                    if(downNeighbor === CELLSTATE.alive) {
                        aliveCount++;
                    }
                }
                // top left neighbor
                if(isWithinRange(i-1, j-1)) {
                    const topLeftNeighbor: number = generation[i-1][j-1];
                    if (topLeftNeighbor === CELLSTATE.alive) {
                        aliveCount++;
                    }
                }
                // top right neighbor
                if(isWithinRange(i-1, j+1)) {
                    const topRightNeighbor: number = generation[i-1][j+1];
                    if (topRightNeighbor === CELLSTATE.alive) {
                        aliveCount++;
                    }
                }
                // bottom left neighbor
                if (isWithinRange(i+1, j-1)) {
                    const bottomLeftNeighbor: number = generation[i+1][j-1];
                    if (bottomLeftNeighbor === CELLSTATE.alive) {
                        aliveCount++;
                    }
                }
                // bottom right neighbor
                if (isWithinRange(i+1, j+1)) {
                    const bottomRightNeighbor: number = generation[i+1][j+1];
                    if( bottomRightNeighbor === CELLSTATE.alive) {
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

    const isWithinRange = (row: number, column: number): boolean => {
        if((row >= 0 && row < generation.length) && (column >= 0 && column < generation[0].length)) {
            return true;
        } else {
            return false;
        }
    }

    const play = (): void => {
        setCommand(COMMAND.resume);
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
        setCommand(COMMAND.play);
        setStatus(STATUS.off);
    }

    const handleStatus = (status: number): void => {
        if (status === STATUS.on) {
            setStatus(STATUS.off); // to show it's paused in the UI
            setCommand(COMMAND.play);
        } else {
            setStatus(STATUS.on);
            setCommand(COMMAND.pause);
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
        if (command === COMMAND.play) {
            autoGeneration = setTimeout(() => {
                nextGeneration();
            }, 500);
        }
    }, [command, nextGeneration])


    useEffect(() => {
        if (command === COMMAND.pause) {
            clearTimeout(autoGeneration);
        }
    }, [command, generation])

    useEffect(() => {
        if (command === COMMAND.resume) {
            return;
        }
    }, [command, generation])

    return(
        <div className={classes.gameOfLife}>
            { displayActions() }
            <div className={classes.gridContainer}>
                <Grid 
                    generation={generation}
                    setGeneration={setGeneration}
                    command={command}
                    setCommand={setCommand}
                    />
            </div>
        </div>
    )
}
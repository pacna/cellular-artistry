// React
import React, { 
    ReactElement, 
    useState, 
    ChangeEvent, 
    FormEvent, 
    useEffect,
    useRef
} from 'react';

// Material UI
import { 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem, 
    FormHelperText,
    ButtonGroup,
    Button
} from '@material-ui/core';

// Other
import { GameOfLifeStyles } from './game-of-life.styles';
import { IClasses } from './game-of-life.interfaces';
import { Grid } from '../grid/grid.component';
import { GridSize } from './grid-size';
import { CELLSTATE } from '../cell/cell.component';

export enum COMMAND {
    pause = 'pause',
    resume = 'resume',
    autoplay = 'autoplay'
}

enum STATUS {
    on = 1,
    off = 0
}

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 370
        },
    }
};

export const GameOfLife = (): ReactElement => {
    const [command, setCommand] = useState('');
    const [status, setStatus] = useState(STATUS.on);
    const [disabled, setDisabled] = useState(true);
    const [row, setRow] = useState('');
    const [column, setColumn] = useState('');
    const [generation, setGeneration] = useState([] as number[][])
    
    let autoGeneration: any = useRef(null);
    const classes: IClasses = GameOfLifeStyles();

    const clearGrid = (): void => {
        setCommand(COMMAND.resume);
        const deadGeneration: number[][] = generation.map((cells: number[]) => {
            return cells.map(() => 0);
        })

        setGeneration(deadGeneration);
    }

    const updateRow = (event: ChangeEvent<{ value: unknown }>): void => {
        const newRowValue = event.target.value as string;
        setRow(newRowValue);
    }

    const updateColumn = (event: ChangeEvent<{ value: unknown }>): void => {
        const newColumnValue = event.target.value as string;
        setColumn(newColumnValue);
    }
    
    const generateGrid = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        createGrid();
        if(disabled) {// no need to set it to false every time.
            setDisabled(false);
        }

    }

    const createGrid = (): void => {
        let firstGeneration: number[][] = [];
        for(let i = 0; i < Number(row); i++) {
            firstGeneration.push([]);
            for(let j = 0; j < Number(column); j++) {
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
        nextGeneration();
    }

    const handleStatus = (status: number): void => {
        if (status === STATUS.on) {
            setStatus(STATUS.off); // to show it's paused in the UI
            setCommand(COMMAND.autoplay);
        } else {
            setStatus(STATUS.on);
            setCommand(COMMAND.pause);
        }
    }

    useEffect(() => {
        if (command === COMMAND.autoplay) {
            autoGeneration = setTimeout(() => {
                nextGeneration()
            }, 1000);
        }
    }, [command, nextGeneration])


    useEffect(() => {
        if (command === COMMAND.pause) {
            clearTimeout(autoGeneration);
        }
    })

    return(
        <div className={classes.center}>
            <div className={classes.marginTop4vhSpacing}>
                <ButtonGroup variant="contained" color="primary" disabled={disabled}>
                    <Button onClick={clearGrid}> Clear </Button>
                    <Button onClick={play}> Next Generation </Button>
                    <Button onClick={() => handleStatus(status)}>
                        { status === STATUS.on ? COMMAND.autoplay : COMMAND.pause}
                    </Button>
                    <Button>
                        Glider
                    </Button>
                </ButtonGroup>
            </div>
            <form className={classes.formContainer} onSubmit={generateGrid}>
                <FormControl color="secondary" required className={classes.formControl}>
                    <InputLabel>Row</InputLabel>
                    <Select
                        value={row} 
                        onChange={updateRow}
                        MenuProps={MenuProps}
                    >
                        {
                            GridSize.map((x: number) => {
                                return(
                                    <MenuItem key={x} value={x}> {x} </MenuItem>
                                )
                            })
                        }
                    </Select>
                    <FormHelperText>Pick {GridSize[0]} - {GridSize[GridSize.length - 1]} </FormHelperText>
                </FormControl>
                <FormControl color="secondary" required className={classes.formControl}>
                    <InputLabel>Column</InputLabel>
                    <Select
                        value={column}
                        onChange={updateColumn}
                        MenuProps={MenuProps}>
                        {
                            GridSize.map((x: number, i: number) => {
                                return(
                                    <MenuItem key={x} value={x}> {x} </MenuItem>
                                )
                            })
                        }
                    </Select>
                    <FormHelperText>Pick {GridSize[0]} - {GridSize[GridSize.length - 1]}</FormHelperText>
                </FormControl>
                <Button type="submit" variant="contained" color="secondary">Generate</Button>
            </form>
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
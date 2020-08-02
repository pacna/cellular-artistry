// React
import React, { ReactElement, useState, ChangeEvent, FormEvent } from 'react';

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

enum COMMAND {
    clear = 'clear'
}

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 190
        },
    }
};

export const GameOfLife = (): ReactElement => {
    const [command, setCommand] = useState('');
    const [row, setRow] = useState('');
    const [column, setColumn] = useState('');
    const [generation, setGeneration] = useState([] as number[][])

    const classes: IClasses = GameOfLifeStyles();

    const clearGrid = (): void => {
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

    const createGrid = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

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
        console.log(generation);
    }

    return(
        <div className={classes.center}>
            <div className={classes.buttonGroupSpacing}>
                <ButtonGroup variant="contained" color="primary">
                    <Button onClick={clearGrid}> Clear </Button>
                    <Button onClick={nextGeneration}> Next Generation </Button>
                    <Button> Pause </Button>
                    <Button> Autoplay </Button>
                </ButtonGroup>
            </div>
            <form className={classes.formContainer} onSubmit={createGrid}>
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
                    <FormHelperText>Pick 5 - 25</FormHelperText>
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
                                    <MenuItem key={i} value={x}> {x} </MenuItem>
                                )
                            })
                        }
                    </Select>
                    <FormHelperText>Pick 5 - 25</FormHelperText>
                </FormControl>
                <Button type="submit" variant="contained" color="secondary">Generate</Button>
            </form>
            <div className={classes.gridContainer}>
                <Grid 
                    generation={generation}
                    command={command}
                    setCommand={setCommand}
                    />
            </div>
        </div>
    )
}
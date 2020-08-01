// React
import React, { ReactElement, useState } from 'react';

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

export const GameOfLife = (): ReactElement => {
    const [command, setCommand] = useState('');
    // temp adding random state to use
    const [generation, setGeneration] = useState([[0,1,0],[0,1,1],[0,1,0]])
    const classes: IClasses = GameOfLifeStyles();

    const clearGrid = (): void => {
        setGeneration([[0,0,0],[0,0,0],[0,0,0]]);
        setCommand(COMMAND.clear);
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
                    <Button> Randomize </Button>
                </ButtonGroup>
            </div>
            <form className={classes.formContainer}>
                <FormControl required className={classes.formControl}>
                    <InputLabel>Row</InputLabel>
                    <Select>
                        <div className={classes.select}>
                            {
                                GridSize.map((x: number) => {
                                    return(
                                        <MenuItem value={x}> {x} </MenuItem>
                                    )
                                })
                            }
                        </div>
                    </Select>
                    <FormHelperText>Pick 5 - 25</FormHelperText>
                </FormControl>
                <FormControl required className={classes.formControl}>
                    <InputLabel>Column</InputLabel>
                    <Select>
                        <div className={classes.select}>
                            {
                                GridSize.map((x: number) => {
                                    return(
                                        <MenuItem value={x}> {x} </MenuItem>
                                    )
                                })
                            }
                        </div>
                    </Select>
                    <FormHelperText>Pick 5 - 25</FormHelperText>
                </FormControl>
                <Button type="submit" variant="contained" color="secondary">Submit</Button>
            </form>
            <div className={classes.gridContainer}>
                <Grid 
                    cellsInitialRandomState={generation}
                    command={command}
                    setCommand={setCommand}
                    />
            </div>
        </div>
    )
}
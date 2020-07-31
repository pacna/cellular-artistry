import React, { ReactElement, useState } from 'react';
import { GameOfLifeStyles } from './game-of-life.styles';
import { IClasses } from './game-of-life.interfaces';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { Grid } from '../grid/grid.component';

enum COMMAND {
    clear = 'clear'
}

export const GameOfLife = (): ReactElement => {
    const [command, setCommand] = useState('');
    // temp adding random state to use
    const [grid, setGrid] = useState([[0,1,0],[0,1,1],[0,1,0]])
    const classes: IClasses = GameOfLifeStyles();

    const clearGrid = (): void => {
        setGrid([[0,0,0],[0,0,0],[0,0,0]]);
        setCommand(COMMAND.clear);
    }

    const nextGeneration = (): void => {
        console.log(grid);
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
            <div className={classes.gridContainer}>
                <Grid 
                    cellsInitialRandomState={grid}
                    command={command}
                    setCommand={setCommand}
                    />
            </div>
        </div>
    )
}
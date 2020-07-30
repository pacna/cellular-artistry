import React, { ReactElement } from 'react';
import { GameOfLifeStyles } from './game-of-life.styles';
import { IClasses } from './game-of-life.interfaces';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { Grid } from '../grid/grid.component';

export const GameOfLife = (): ReactElement => {
    const classes: IClasses = GameOfLifeStyles();
    // temp adding random state to use
    const cellsInitialRandomState: number[][] = [[0,1,0],[0,1,1],[0,1,0]];

    return(
        <div className={classes.center}>
            <div className={classes.buttonGroupSpacing}>
                <ButtonGroup variant="contained" color="primary">
                    <Button> Clear </Button>
                    <Button> Generate </Button>
                    <Button> Pause </Button>
                    <Button> Randomize </Button>
                </ButtonGroup>
            </div>
            <div className={classes.gridContainer}>
                <Grid cellsInitialRandomState={cellsInitialRandomState}/>
            </div>
        </div>
    )
}
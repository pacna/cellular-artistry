import React from 'react';
import { GameOfLifeStyles } from './game-of-life.styles';
import { IClasses } from './game-of-life.interfaces';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { Grid } from '../grid/grid.component';

export const GameOfLife = () => {
    const classes: IClasses = GameOfLifeStyles();
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
            <div className={classes.gridSpacing}>
                <Grid />
            </div>
        </div>
    )
}
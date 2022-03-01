// Mui
import { 
    ButtonGroup,
    Button
} from '@mui/material';

// Types
import { STATUS, COMMAND } from './types/customs';
import { GameOfLifeActionsConfig } from './types/configs/game-of-life-actions-config';

// Styles
import classes from '../styles/game-of-life-actions.module.scss';

export const GameOfLifeActions = (props: GameOfLifeActionsConfig): JSX.Element => {
    const { status, handleStatus, clearGrid, play, playGlider} = props;

    return(
        <ButtonGroup className={classes.gameOfLifeActionsContainer} variant="contained" color="primary">
            <Button onClick={clearGrid}> Clear </Button>
            <Button onClick={play}> Next Generation </Button>
            <Button onClick={() => handleStatus(status)}>
                { status === STATUS.on ? COMMAND.play : COMMAND.pause}
            </Button>
            <Button onClick={playGlider}>
                Glider
            </Button>
        </ButtonGroup>
    )
}
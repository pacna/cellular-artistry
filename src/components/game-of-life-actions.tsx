import { Button, ButtonGroup } from "@mui/material";
import { ReactElement, useContext, useEffect, useState } from "react";
import {
    Command,
    CommandContextConfig,
    GameOfLifeActionsConfig,
} from "../types";
import { CommandContext } from "../contexts";

export const GameOfLifeActions = ({
    clearGrid,
    play,
    playGlider,
}: GameOfLifeActionsConfig): ReactElement => {
    const [started, setStarted] = useState<boolean>(false);
    const { command, setCommand } =
        useContext<CommandContextConfig>(CommandContext);

    const clear = (): void => {
        clearGrid();
        setCommand(Command.Pause);
    };

    const togglePlayState = (): void => {
        setCommand((currentCommand: Command) =>
            currentCommand === Command.Play ? Command.Pause : Command.Play
        );
    };

    const displayPlayStateText = (): string => {
        return started
            ? command === Command.Pause
                ? "Resume"
                : Command.Pause
            : Command.Play;
    };

    useEffect((): void => {
        if (command === Command.Play && !started) {
            setStarted(true);
        }
    }, [command]);

    return (
        <ButtonGroup variant="contained" color="primary">
            <Button onClick={clear}> Clear </Button>
            <Button onClick={play}> Next Generation </Button>
            <Button onClick={togglePlayState}> {displayPlayStateText()}</Button>
            <Button onClick={playGlider}>Glider</Button>
        </ButtonGroup>
    );
};

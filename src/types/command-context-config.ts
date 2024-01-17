import { SetStateAction } from "react";

export enum Command {
    Play = "Play",
    Pause = "Pause",
}

export type CommandContextConfig = {
    command: Command;
    setCommand: (value: SetStateAction<Command>) => void;
};

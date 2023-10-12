import { SetStateAction } from "react";
import { Command } from "./command.enum";

export interface CommandContextConfig {
    command: Command;
    setCommand: (value: SetStateAction<Command>) => void;
}

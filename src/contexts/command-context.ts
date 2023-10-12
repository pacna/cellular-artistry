import { Context, createContext } from "react";
import { CommandContextConfig } from "../types";

export const CommandContext: Context<CommandContextConfig> =
    createContext<CommandContextConfig>({} as CommandContextConfig);

import { SetStateAction } from "react";

export interface GridFormActionsConfig {
    generateGrid: () => void;
    setRow: (value: SetStateAction<number>) => void;
    setColumn: (value: SetStateAction<number>) => void;
}

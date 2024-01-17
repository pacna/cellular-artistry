import { SetStateAction } from "react";

export type GridFormActionsConfig = {
    generateGrid: () => void;
    setRow: (value: SetStateAction<number>) => void;
    setColumn: (value: SetStateAction<number>) => void;
};

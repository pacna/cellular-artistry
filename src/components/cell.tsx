import { ReactElement, useEffect, useState } from "react";
import { CellConfig, CellState } from "../types";

export const Cell = ({
    state,
    coordinate,
    updateCellState,
}: CellConfig): ReactElement => {
    const [cellState, setCellState] = useState<CellState>(state);

    const toggleCellState = (): void => {
        const newCellState: CellState =
            cellState === CellState.Alive ? CellState.Dead : CellState.Alive;
        setCellState(newCellState);
        updateCellState(newCellState, coordinate);
    };

    const displayCellBackgroundColor = (cellState: number): string => {
        return cellState === CellState.Alive ? "bg-white" : "bg-black";
    };

    useEffect((): void => {
        setCellState(state);
    }, [state]);

    return (
        <div
            onClick={toggleCellState}
            className={`h-[14px] w-[14px] border-solid border border-black ${displayCellBackgroundColor(
                cellState
            )}`}
        ></div>
    );
};

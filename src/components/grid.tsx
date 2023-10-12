import { ReactElement } from "react";
import { CellState, Coordinate } from "../types";
import { Cell } from "./cell";

export const Grid = ({
    generation,
}: {
    generation: CellState[][];
}): ReactElement => {
    const updateCellState = (
        newCellState: CellState,
        cellCoordinate: Coordinate
    ): void => {
        generation[cellCoordinate.xPos][cellCoordinate.yPos] = newCellState;
    };

    const createGrid = (generation: CellState[][]): ReactElement => {
        return (
            <div className="bg-white max-w-fit border-4 border-solid border-primary-blue">
                {generation.map((cells: CellState[], rowIndex: number) => (
                    <div className="flex" key={rowIndex}>
                        {cells.map((cell: CellState, columnIndex: number) => (
                            <Cell
                                key={columnIndex}
                                state={cell}
                                coordinate={{
                                    xPos: rowIndex,
                                    yPos: columnIndex,
                                }}
                                updateCellState={updateCellState}
                            />
                        ))}
                    </div>
                ))}
            </div>
        );
    };

    return <>{createGrid(generation)}</>;
};

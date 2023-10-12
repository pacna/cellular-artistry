import { Coordinate } from "./coordinate";
import { CellState } from "./cell-state.enum";

export interface CellConfig {
    state: CellState;
    coordinate: Coordinate;
    updateCellState: (
        newCellState: CellState,
        cellCoordinate: Coordinate
    ) => void;
}

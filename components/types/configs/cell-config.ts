// Types
import { CELLSTATE, CellCoordinate } from "../customs";

export interface CellConfig {
  state: CELLSTATE;
  coordinate: CellCoordinate;
  updateCellState: (
    newCellState: CELLSTATE,
    cellCoordinate: CellCoordinate
  ) => void;
}

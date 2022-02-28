// Types
import { CELLSTATE } from "../customs";

export interface CellConfig {
  state: CELLSTATE;
  xPos: number;
  yPos: number;
  updateCellState: (newState: CELLSTATE, xPos: number, yPos: number) => void;
}

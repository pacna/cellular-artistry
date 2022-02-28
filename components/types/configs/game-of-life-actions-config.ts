// Types
import { STATUS } from "./../customs/status.enum";

export interface GameOfLifeActionsConfig {
  clearGrid: () => void;
  play: () => void;
  playGlider: () => void;
  status: STATUS;
  handleStatus: (status: STATUS) => void;
}

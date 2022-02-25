export interface CellConfig {
  cellState: number;
  command: string;
  setCommand: Function;
  setGeneration: Function;
  generation: number[][];
  row: number;
  column: number;
}

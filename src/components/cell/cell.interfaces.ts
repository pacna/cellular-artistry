export interface ICell {
    cellState: number;
    command: string;
    setCommand: Function;
    setGeneration: Function;
    generation: number[][];
    row: number;
    column: number;
}

export interface IClasses {
    cell: any;
    dead: any;
    alive: any;
}
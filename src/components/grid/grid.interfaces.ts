export interface IGrid {
    generation: number[][];
    command: string;
    setCommand: Function;
    setGeneration: Function;
}

export interface IClasses {
    grid: any;
    cellContainer: any;
}
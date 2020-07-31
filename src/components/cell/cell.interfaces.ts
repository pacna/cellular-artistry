export interface ICell {
    cellState: number;
    command: string;
    setCommand: Function;
}

export interface IClasses {
    cell: any;
    dead: any;
    alive: any;
}
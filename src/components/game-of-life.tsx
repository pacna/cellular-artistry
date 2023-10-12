import { ReactElement, useCallback, useEffect, useState } from "react";
import { GridFormActions } from "./grid-form-actions";
import { GameOfLifeActions } from "./game-of-life-actions";
import { CellState, Command, Coordinate } from "../types";
import { Grid } from "./grid";
import { Typography } from "@mui/material";
import { CommandContext } from "../contexts";

export const GameOfLife = (): ReactElement => {
    const [command, setCommand] = useState<Command>(Command.Pause);
    const [show, setShow] = useState<boolean>(false);
    const [generation, setGeneration] = useState<CellState[][]>(
        [] as CellState[][]
    );
    const [row, setRow] = useState<number>(0);
    const [column, setColumn] = useState<number>(0);
    const [generationCounter, setGenerationCounter] = useState<number>(0);

    const clearGrid = (): void => {
        setGeneration(noSurvivors());
    };

    const noSurvivors = (): CellState[][] => {
        return generation.map((cells: CellState[]) => {
            return cells.map(() => CellState.Dead);
        });
    };

    const generateGrid = (): void => {
        setGeneration(createGrid(row, column));
        setShow(true);
    };

    const createGrid = (row: number, column: number): CellState[][] => {
        const generateRandomCellState = (): CellState => {
            return Math.round(Math.random()) as CellState;
        };

        let firstGeneration: CellState[][] = [];
        for (let i = 0; i < row; i++) {
            firstGeneration.push([]);
            for (let j = 0; j < column; j++) {
                firstGeneration[i].push(generateRandomCellState());
            }
        }

        return firstGeneration;
    };

    const calculateAliveNeighbors = (
        generation: CellState[][],
        rowIndex: number,
        columnIndex: number
    ): number => {
        // neighbors: LEFT, RIGHT, TOP, DOWN, TOP LEFT, TOP RIGHT, BOTTOM LEFT, BOTTOM RIGHT
        const neighborOffsets: Coordinate[] = [
            { xPos: -1, yPos: 0 },
            { xPos: 1, yPos: 0 },
            { xPos: 0, yPos: -1 },
            { xPos: 0, yPos: 1 },
            { xPos: -1, yPos: -1 },
            { xPos: -1, yPos: 1 },
            { xPos: 1, yPos: -1 },
            { xPos: 1, yPos: 1 },
        ];

        const isWithinRange = (xPos: number, yPos: number): boolean => {
            return xPos >= 0 && xPos < row && yPos >= 0 && yPos < column;
        };

        let aliveCount: number = 0;

        for (const neighborOffset of neighborOffsets) {
            let neighborXPos: number = rowIndex + neighborOffset.xPos;
            let neighborYPos: number = columnIndex + neighborOffset.yPos;

            if (
                isWithinRange(neighborXPos, neighborYPos) &&
                generation[neighborXPos][neighborYPos] === CellState.Alive
            ) {
                aliveCount++;
            }
        }

        return aliveCount;
    };

    const nextGeneration = (): void => {
        const applyGameOfLifeRules = (
            aliveCount: number,
            cell: number
        ): number => {
            if (cell === CellState.Alive) {
                return aliveCount === 2 || aliveCount === 3
                    ? CellState.Alive
                    : CellState.Dead;
            }
            return aliveCount === 3 ? CellState.Alive : CellState.Dead;
        };

        const nextGeneration: CellState[][] = generation.map(
            (cells: CellState[], rowIndex: number) => {
                return cells.map((cell: CellState, columnIndex: number) => {
                    return applyGameOfLifeRules(
                        calculateAliveNeighbors(
                            generation,
                            rowIndex,
                            columnIndex
                        ),
                        cell
                    );
                });
            }
        );

        setGeneration(nextGeneration);
        setGenerationCounter(generationCounter + 1);
    };

    const play = (): void => {
        setCommand(Command.Pause);
        nextGeneration();
    };

    const playGlider = (): void => {
        const createGlider = (generation: CellState[][]): CellState[][] => {
            const gliderOnLeft = (generation: CellState[][]): void => {
                generation[0][1] = CellState.Alive;
                generation[1][2] = CellState.Alive;
                generation[2][0] = CellState.Alive;
                generation[2][1] = CellState.Alive;
                generation[2][2] = CellState.Alive;
            };

            const gliderOnRight = (generation: CellState[][]): void => {
                const rightEndSide: number = generation[0].length - 1;
                generation[0][rightEndSide - 1] = CellState.Alive;
                generation[1][rightEndSide - 2] = CellState.Alive;
                generation[2][rightEndSide] = CellState.Alive;
                generation[2][rightEndSide - 1] = CellState.Alive;
                generation[2][rightEndSide - 2] = CellState.Alive;
            };

            const shouldGliderBePositionLeft: boolean =
                Math.round(Math.random()) % 2 === 0;

            if (shouldGliderBePositionLeft) {
                gliderOnLeft(generation);
            } else {
                gliderOnRight(generation);
            }

            return generation;
        };

        setGeneration(createGlider(noSurvivors()));

        if (command === Command.Play) {
            // if it's already playing then do nothing
            return;
        }

        setCommand(Command.Play);
    };

    const displayGameOfLife = (): ReactElement => {
        if (show) {
            return (
                <>
                    <GameOfLifeActions
                        clearGrid={clearGrid}
                        play={play}
                        playGlider={playGlider}
                    />
                    <div className="flex items-center flex-col">
                        <Typography
                            variant="h2"
                            className="!my-8 !text-xl !font-bold"
                        >
                            Generation {generationCounter}
                        </Typography>
                        <Grid generation={generation} />
                    </div>
                </>
            );
        }

        return (
            <GridFormActions
                generateGrid={generateGrid}
                setRow={setRow}
                setColumn={setColumn}
            />
        );
    };

    const handleCommand = useCallback(() => {
        switch (command) {
            case Command.Play:
                nextGeneration();
                break;
            case Command.Pause:
            default:
                break;
        }
    }, [command, nextGeneration]);

    useEffect((): (() => void) => {
        const loop = setTimeout(handleCommand, 500);

        return () => clearTimeout(loop);
    }, [handleCommand]);

    return (
        <CommandContext.Provider value={{ command, setCommand }}>
            <div className="text-center mt-8">{displayGameOfLife()}</div>
        </CommandContext.Provider>
    );
};

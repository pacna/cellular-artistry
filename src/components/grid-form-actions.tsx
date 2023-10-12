import { Button, TextField } from "@mui/material";
import { ChangeEvent, FormEvent, ReactElement, useState } from "react";
import { GridFormActionsConfig } from "../types/grid-form-actions-config";

export const GridFormActions = ({
    generateGrid,
    setRow,
    setColumn,
}: GridFormActionsConfig): ReactElement => {
    const [rowValidator, setRowValidator] = useState<boolean>(false);
    const [columnValidator, setColumnValidator] = useState<boolean>(false);

    const handleInput = (
        input: number,
        validator: (value: React.SetStateAction<boolean>) => void,
        writeDim: (value: React.SetStateAction<number>) => void
    ): void => {
        validator(input < 3);
        if (input >= 3) {
            writeDim(input);
        }
    };

    const submit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        generateGrid();
    };

    return (
        <form
            className="flex justify-center items-center gap-[16px]"
            onSubmit={submit}
        >
            <TextField
                onChange={(
                    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) =>
                    handleInput(
                        parseInt(event.target.value),
                        setRowValidator,
                        setRow
                    )
                }
                error={rowValidator}
                label="Row"
                required
                type="number"
                variant="outlined"
                inputProps={{ min: 3 }}
                helperText="Input must be 3 or greater"
            />
            <TextField
                onChange={(
                    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) =>
                    handleInput(
                        parseInt(event.target.value),
                        setColumnValidator,
                        setColumn
                    )
                }
                error={columnValidator}
                label="Column"
                required
                type="number"
                variant="outlined"
                inputProps={{ min: 3 }}
                helperText="Input must be 3 or greater"
            />

            <Button
                type="submit"
                variant="contained"
                color="secondary"
                className="!mb-[24px]"
            >
                Generate
            </Button>
        </form>
    );
};

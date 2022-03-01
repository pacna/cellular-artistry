// React
import { ChangeEvent, FormEvent, useState } from 'react';

// Mui
import {
    Button,
    TextField
} from '@mui/material';

// Style
import classes from '../styles/grid-form-management.module.scss';

// Types
import { GridFormManagementConfig } from './types/configs/grid-form-management-config';

export const GridFormManagement = (props: GridFormManagementConfig): JSX.Element => {
    const { setRow, setColumn, generateGrid } = props;
    const [ rowValidator, setRowValidator ] = useState<boolean>(false);
    const [ columnValidator, setColumnValidator ] = useState<boolean>(false);

    const handleRowInput = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const rowInput: number = Number(event.target.value);
        if (rowInput >= 3) {
            setRowValidator(false);
            setRow(rowInput);
        } else {
            setRowValidator(true);
        }
    }

    const handleColumnInput = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const columnInput: number = Number(event.target.value);
        if (columnInput >= 3) {
            setColumnValidator(false);
            setColumn(columnInput);
        } else {
            setColumnValidator(true);
        }
    }

    const submit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        generateGrid();
    }

    return(
            <form className={classes.gridFormManagementContainer} onSubmit={submit}>
                <TextField
                    onChange={handleRowInput}
                    error={rowValidator}
                    label="Row" 
                    required 
                    type="number" 
                    variant="outlined"
                    inputProps={ { min: 3 }}
                    helperText="Input must be 3 or greater"/>
                <TextField
                    onChange={handleColumnInput} 
                    error={columnValidator}
                    label="Column" 
                    required 
                    type="number" 
                    variant="outlined"
                    inputProps={ { min: 3 }}
                    helperText="Input must be 3 or greater"/>

                <Button type="submit" variant="contained" color="secondary">Generate</Button>
            </form>
    )
};
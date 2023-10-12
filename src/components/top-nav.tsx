import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ReactElement } from "react";

export const TopNav = (): ReactElement => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h1"
                    className="grow text-center !text-xl !font-medium"
                >
                    Cellular Artistry
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

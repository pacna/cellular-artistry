import React from "react";
import ReactDOM from "react-dom/client";
import { TopNav, GameOfLife } from "./components";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <TopNav />
        <GameOfLife />
    </React.StrictMode>
);

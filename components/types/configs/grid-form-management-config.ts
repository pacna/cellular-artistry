import { SetStateAction } from "react";

export interface GridFormManagementConfig {
  generateGrid: () => void;
  setRow: (value: SetStateAction<number>) => void;
  setColumn: (value: SetStateAction<number>) => void;
}

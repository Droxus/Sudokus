import {
  updateGrid,
  generateGrid,
  getActiveCell,
  getFlatSection,
  getSection,
  isValidCell,
  isValidSudoku,
} from "@/utills/grid";
import { Cell } from "@/utills/models";
import { createContext, useContext, useMemo, useState } from "react";

const gridContext = createContext<any>(null);

export function GridContext({ children }: any) {
  const [cells, setCells] = useState(() => generateGrid());

  const value = useMemo(
    () => ({
      cells,
      sections: Array.from({ length: cells.length }, (_, index) =>
        getSection(cells, index)
      ),
      flatSections: Array.from({ length: cells.length }, (_, index) =>
        getFlatSection(cells, index)
      ),
      activeCell: getActiveCell(cells),
      setCell: (cell: Cell) =>
        setCells((prevCells) => updateGrid(prevCells, cell)),
    }),
    [cells, setCells]
  );

  return <gridContext.Provider value={value}>{children}</gridContext.Provider>;
}

export const useGridContext = () => useContext(gridContext);

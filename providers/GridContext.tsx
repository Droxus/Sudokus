import { generateGrid, getFlatSection, getSection } from "@/utills/grid";
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
      setCell: (newCell: Cell) =>
        setCells((prevCells) =>
          prevCells.map((rows, i) =>
            rows.map((cell, j) =>
              i === newCell.row && j === newCell.column
                ? newCell
                : new Cell({ ...cell, isActive: false })
            )
          )
        ),
    }),
    [cells, setCells]
  );

  return <gridContext.Provider value={value}>{children}</gridContext.Provider>;
}

export const useGridContext = () => useContext(gridContext);

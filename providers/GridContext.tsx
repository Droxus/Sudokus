import { createContext, useContext, useMemo, useState } from "react";

const gridContext = createContext<any>(null);

export function GridContext({ children }: any) {
  const [changeActiveCellValue, setChangeActiveCellValue] = useState();

  const value = useMemo(
    () => ({
      changeActiveCellValue,
      setChangeActiveCellValue,
    }),
    [changeActiveCellValue, setChangeActiveCellValue]
  );

  return <gridContext.Provider value={value}>{children}</gridContext.Provider>;
}

export const useGridContext = () => useContext(gridContext);

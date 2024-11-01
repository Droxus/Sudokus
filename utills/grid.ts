import { Cell, Grid } from "./models";

export function generateGrid(): Grid {
  const size = 9;

  return Array.from({ length: size }, (_, row) =>
    Array.from(
      { length: size },
      (_, column) =>
        new Cell({
          value: Math.floor(Math.random() * 10),
          row,
          column,
        })
    )
  );
}

export function getSection(grid: Grid, index: number): Grid {
  const output: Grid = [];
  const sectionSize = Math.sqrt(grid.length);

  const row = Math.floor(index / 3);
  const column = index % 3;

  for (let i = row * sectionSize; i < (row + 1) * sectionSize; i++) {
    const rows: Cell[] = [];
    for (let j = column * sectionSize; j < (column + 1) * sectionSize; j++) {
      rows.push(grid[i][j]);
    }
    output.push(rows);
  }

  return output;
}

export function getFlatSection(grid: Grid, index: number): Cell[] {
  const output: Cell[] = [];
  const sectionSize = Math.sqrt(grid.length);

  const row = Math.floor(index / 3);
  const column = index % 3;

  for (let i = row * sectionSize; i < (row + 1) * sectionSize; i++) {
    for (let j = column * sectionSize; j < (column + 1) * sectionSize; j++) {
      output.push(grid[i][j]);
    }
  }

  return output;
}

export function getActiveCell(grid: Grid): Cell | undefined {
  return grid
    .find((rows) => rows.find((cell) => cell.isActive))
    ?.find((cell) => cell.isActive);
}

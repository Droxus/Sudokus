import { Cell, Grid, Section } from "./models";

export function generateGrid(): Grid {
  const size = 9;
  const seedRow = Array.from({ length: size }, (_, index) => index + 1);

  const rows = [];
  rows[0] = seedRow;

  for (let i = 1; i < size; i++) {
    const shiftedValue = Math.floor(i / 3) + (i % 3) * (size / 3);
    rows[i] = seedRow
      .slice(shiftedValue, size)
      .concat(seedRow.slice(0, shiftedValue));
  }

  let grid = rows.map((cells, row) =>
    cells.map((value, column) => new Cell({ value, row, column }))
  );
  console.debug(grid);
  return grid
}

export function updateGrid(grid: Grid, newCell: Cell): Grid {
  return grid.map((rows, i) =>
    rows.map((cell, j) =>
      i === newCell.row && j === newCell.column
        ? new Cell({ ...newCell, isValid: cell.value === newCell.value ? cell.isValid : isValidCell(grid, newCell) })
        : new Cell({ ...cell, isActive: false })
    )
  );
}

export function isValidCell(grid: Grid, cell: Cell) {
  const filterNotSelf = (c: Cell) => !(c.row === cell.row && c.column === cell.column)
  const row = grid[cell.row];
  const column = grid.map((row) => row[cell.column]);
  const section = getFlatSection(grid, Math.floor(cell.row / 3) * 3 + Math.floor(cell.column / 3)).cells;

  return [...row, ...column, ...section].filter(filterNotSelf).every(c => c.value !== cell.value);
}

export function isValidSudoku(grid: Grid) {
  const board = grid.map((e) => e.map((e) => e.value));
  const rows: number[][] = [];
  const columns: number[][] = [];
  const boxes: number[][] = [];

  board.forEach((row, rowNum) => {
    rows.push(row);
    row.forEach((cell, colNum) => {
      if (!columns[colNum]) {
        columns[colNum] = [];
      }
      columns[colNum].push(cell);

      const boxIndex = Math.floor(rowNum / 3) * 3 + Math.floor(colNum / 3);
      if (!boxes[boxIndex]) {
        boxes[boxIndex] = [];
      }
      boxes[boxIndex].push(cell);
    });
  });

  const squences = [...rows, ...columns, ...boxes];
  return squences.every((squence) => {
    const filteredSequence = squence.filter((cell) => !!cell);
    const uniqueNums = new Set(filteredSequence);
    return filteredSequence.length === uniqueNums.size;
  });
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

export function getFlatSection(grid: Grid, index: number): Section {
  const output: Section = new Section({ index: index, cells: [] });
  const sectionSize = Math.sqrt(grid.length);

  const row = Math.floor(index / 3);
  const column = index % 3;

  for (let i = row * sectionSize; i < (row + 1) * sectionSize; i++) {
    for (let j = column * sectionSize; j < (column + 1) * sectionSize; j++) {
      output.cells.push(grid[i][j]);
    }
  }

  return output;
}

export function getActiveCell(grid: Grid): Cell | undefined {
  return grid
    .find((rows) => rows.find((cell) => cell.isActive))
    ?.find((cell) => cell.isActive);
}

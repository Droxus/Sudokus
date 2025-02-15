import { Cell, Grid, Section } from "./models";

const GRID_SIZE = 9;
const SECTION_SIZE = 3;
const SECTION_COMBINATIONS = ["012", "021", "102", "120", "201", "210"] as const;

export function generateSeedRow(): number[] {
  const MAX_SHEFFLES = 1e4;
  const seedRow = Array.from({ length: GRID_SIZE }, (_, index) => index);

  const numOfShuffles = Math.ceil(Math.random() * MAX_SHEFFLES);
  for (let i = 0; i < numOfShuffles; i++) {
    const firstRandIndex = Math.floor(Math.random() * GRID_SIZE);
    const secondRandIndex = Math.floor(Math.random() * GRID_SIZE);

    const temp = seedRow[firstRandIndex];
    seedRow[firstRandIndex] = seedRow[secondRandIndex];
    seedRow[secondRandIndex] = temp;
  }

  return seedRow;
}

export function generateSeedColumn(): number[] {
  const seedColumn: number[] = []

  for (let col = 0; col < GRID_SIZE; col += SECTION_SIZE) {
    const randCombIndex = Math.floor(Math.random() * SECTION_COMBINATIONS.length);
    const randComb = SECTION_COMBINATIONS[randCombIndex]
    for (let i = 0; i < randComb.length; i++) {
      seedColumn.push(col + Number(randComb[i]))
    }
  }

  return seedColumn;
}

export function generateGrid(seedRow: number[], seedColumn: number[]): Grid {
  const rows = [];

  for (let i = 0; i < GRID_SIZE; i++) {
    const shiftedValue = Math.floor(i / SECTION_SIZE) + (i % SECTION_SIZE) * (GRID_SIZE / SECTION_SIZE);
    rows[i] = seedRow
      .slice(shiftedValue, GRID_SIZE)
      .concat(seedRow.slice(0, shiftedValue));
  }

  for (let col = 0; col < GRID_SIZE; col += SECTION_SIZE) {
    for (let row = 0; row < GRID_SIZE; row++) {
      const prevColumns = [
        rows[row][col + 0], rows[row][col + 1], rows[row][col + 2]
      ]
      for (let i = 0; i < SECTION_SIZE; i++) {
        rows[row][seedColumn[col + i]] = prevColumns[i];
      }
    }
  }


  let grid = rows.map((cells, row) =>
    cells.map((value, column) => new Cell({ value: value + 1, row, column }))
  );

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
  const section = getFlatSection(grid, Math.floor(cell.row / SECTION_SIZE) * SECTION_SIZE + Math.floor(cell.column / SECTION_SIZE)).cells;

  return [...row, ...column, ...section].filter(filterNotSelf).every(c => c.value !== cell.value);
}

export function isValidGrid(grid: Grid) {
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

      const boxIndex = Math.floor(rowNum / SECTION_SIZE) * SECTION_SIZE + Math.floor(colNum / SECTION_SIZE);
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

  const row = Math.floor(index / SECTION_SIZE);
  const column = index % SECTION_SIZE;

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

  const row = Math.floor(index / SECTION_SIZE);
  const column = index % SECTION_SIZE;

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

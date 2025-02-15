import { generateGrid, generateSeed, isValidCell, isValidGrid, updateGrid } from "./grid";
import { Cell } from "./models";

describe('isValidGrid', () => {
    test("should return true for valid sudoku", () => {
        const grid = [
            [5, 3, 4, 6, 7, 8, 9, 1, 2],
            [6, 7, 2, 1, 9, 5, 3, 4, 8],
            [1, 9, 8, 3, 4, 2, 5, 6, 7],
            [8, 5, 9, 7, 6, 1, 4, 2, 3],
            [4, 2, 6, 8, 5, 3, 7, 9, 1],
            [7, 1, 3, 9, 2, 4, 8, 5, 6],
            [9, 6, 1, 5, 3, 7, 2, 8, 4],
            [2, 8, 7, 4, 1, 9, 6, 3, 5],
            [3, 4, 5, 2, 8, 6, 1, 7, 9]
        ].map((row, rowIndex) => row.map((value, colIndex) => new Cell({ value, row: rowIndex, column: colIndex })));

        expect(isValidGrid(grid)).toBe(true);
    });

    test("should return false for invalid sudoku with duplicate in row", () => {
        const grid = [
            [5, 3, 4, 6, 7, 8, 9, 1, 2],
            [6, 7, 2, 1, 9, 5, 3, 4, 8],
            [1, 9, 8, 3, 4, 2, 5, 6, 7],
            [8, 5, 9, 7, 6, 1, 4, 2, 3],
            [4, 2, 6, 8, 5, 3, 7, 9, 1],
            [7, 1, 3, 9, 2, 4, 8, 5, 6],
            [9, 6, 1, 5, 3, 7, 2, 8, 4],
            [2, 8, 7, 4, 1, 9, 6, 3, 5],
            [3, 4, 5, 2, 8, 6, 1, 7, 5] // Duplicate 5 in the last row
        ].map((row, rowIndex) => row.map((value, colIndex) => new Cell({ value, row: rowIndex, column: colIndex })));

        expect(isValidGrid(grid)).toBe(false);
    });

    test("should return false for invalid sudoku with duplicate in column", () => {
        const grid = [
            [5, 3, 4, 6, 7, 8, 9, 1, 2],
            [6, 7, 2, 1, 9, 5, 3, 4, 8],
            [1, 9, 8, 3, 4, 2, 5, 6, 7],
            [8, 5, 9, 7, 6, 1, 4, 2, 3],
            [4, 2, 6, 8, 5, 3, 7, 9, 1],
            [7, 1, 3, 9, 2, 4, 8, 5, 6],
            [9, 6, 1, 5, 3, 7, 2, 8, 4],
            [2, 8, 7, 4, 1, 9, 6, 3, 5],
            [3, 4, 5, 2, 8, 6, 1, 7, 9]
        ].map((row, rowIndex) => row.map((value, colIndex) => new Cell({ value, row: rowIndex, column: colIndex })));

        expect(isValidGrid(grid)).toBe(true);

        grid[0][0] = new Cell({ value: 9, row: 0, column: 0 }); // Duplicate 9 in the first column

        expect(isValidGrid(grid)).toBe(false);
    });

    test("should return false for invalid sudoku with duplicate in section", () => {
        const grid = [
            [5, 3, 4, 6, 7, 8, 9, 1, 2],
            [6, 7, 2, 1, 9, 5, 3, 4, 8],
            [1, 9, 8, 3, 4, 2, 5, 6, 7],
            [8, 5, 9, 7, 6, 1, 4, 2, 3],
            [4, 2, 6, 8, 5, 3, 7, 9, 1],
            [7, 1, 3, 9, 2, 4, 8, 5, 6],
            [9, 6, 1, 5, 3, 7, 2, 8, 4],
            [2, 8, 7, 4, 1, 9, 6, 3, 5],
            [3, 4, 5, 2, 8, 6, 1, 7, 9]
        ].map((row, rowIndex) => row.map((value, colIndex) => new Cell({ value, row: rowIndex, column: colIndex })));

        expect(isValidGrid(grid)).toBe(true);

        grid[0][0] = new Cell({ value: 8, row: 0, column: 0 }); // Duplicate 9 in the first column

        expect(isValidGrid(grid)).toBe(false);
    });

    test("should return false for invalid sudoku with all cells having the same value", () => {
        const grid = Array.from({ length: 9 }, (_, rowIndex) =>
            Array.from({ length: 9 }, (_, colIndex) => new Cell({ value: 1, row: rowIndex, column: colIndex }))
        );

        expect(isValidGrid(grid)).toBe(false);
    });
});

describe('isValidCell', () => {
    test("should validate cell against row, column, and section it is in", () => {
        const grid = [
            [5, 3, 4, 6, 7, 8, 9, 1, 2],
            [6, 7, 2, 1, 9, 5, 3, 4, 8],
            [1, 9, 8, 3, 4, 2, 5, 6, 7],
            [8, 5, 9, 7, 6, 1, 4, 2, 3],
            [4, 2, 6, 8, 5, 3, 7, 9, 1],
            [7, 1, 3, 9, 2, 4, 8, 5, 6],
            [9, 6, 1, 5, 3, 7, 2, 8, 4],
            [2, 8, 7, 4, 1, 9, 6, 3, 5],
            [3, 4, 5, 2, 8, 6, 1, 7, 9]
        ].map((row, rowIndex) => row.map((value, colIndex) => new Cell({ value, row: rowIndex, column: colIndex })));

        expect(isValidCell(grid, new Cell({ value: 5, row: 0, column: 0 }))).toBe(true);

        expect(isValidCell(grid, new Cell({ value: 8, row: 0, column: 0 }))).toBe(false);

        expect(isValidCell(grid, new Cell({ value: 2, row: 8, column: 3 }))).toBe(true);
    });
});

describe('updateGrid', () => {
    test("should change grid cell value by given row and column indices", () => {
        const grid = [
            [5, 3, 4, 6, 7, 8, 9, 1, 2],
            [6, 7, 2, 1, 9, 5, 3, 4, 8],
            [1, 9, 8, 3, 4, 2, 5, 6, 7],
            [8, 5, 9, 7, 6, 1, 4, 2, 3],
            [4, 2, 6, 8, 5, 3, 7, 9, 1],
            [7, 1, 3, 9, 2, 4, 8, 5, 6],
            [9, 6, 1, 5, 3, 7, 2, 8, 4],
            [2, 8, 7, 4, 1, 9, 6, 3, 5],
            [3, 4, 5, 2, 8, 6, 1, 7, 9]
        ].map((row, rowIndex) => row.map((value, colIndex) => new Cell({ value, row: rowIndex, column: colIndex })));

        let updatedGrid = updateGrid(grid, new Cell({ value: 4, row: 0, column: 0 }));

        expect(updatedGrid[0][0]).toEqual(expect.objectContaining({ value: 4 }));

        updatedGrid = updateGrid(grid, new Cell({ value: 8, row: grid.length, column: grid.length }));

        expect(updatedGrid).toEqual(grid);

        updatedGrid = updateGrid(grid, new Cell({ value: 7, row: 1, column: 1 }));

        expect(updatedGrid[1][1]).toEqual(expect.objectContaining({ value: 7 }));
    });

    test("should deactivate other grid cells ", () => {
        const grid = [
            [5, 3, 4, 6, 7, 8, 9, 1, 2],
            [6, 7, 2, 1, 9, 5, 3, 4, 8],
            [1, 9, 8, 3, 4, 2, 5, 6, 7],
            [8, 5, 9, 7, 6, 1, 4, 2, 3],
            [4, 2, 6, 8, 5, 3, 7, 9, 1],
            [7, 1, 3, 9, 2, 4, 8, 5, 6],
            [9, 6, 1, 5, 3, 7, 2, 8, 4],
            [2, 8, 7, 4, 1, 9, 6, 3, 5],
            [3, 4, 5, 2, 8, 6, 1, 7, 9]
        ].map((row, rowIndex) => row.map((value, colIndex) => new Cell({ value, row: rowIndex, column: colIndex })));

        const cell = new Cell({ value: 1, row: 0, column: 0, isActive: false })
        let updatedGrid = updateGrid(grid, cell);

        expect(updatedGrid[0][0].isActive).toBe(false);
        expect(updatedGrid[0].filter(c => !(c.column === cell.column && c.row == cell.row)).forEach(cell => {
            expect(cell.isActive).toBe(false);
        }))
    });

    test("should change grid cell validity", () => {
        const grid = [
            [5, 3, 4, 6, 7, 8, 9, 1, 2],
            [6, 7, 2, 1, 9, 5, 3, 4, 8],
            [1, 9, 8, 3, 4, 2, 5, 6, 7],
            [8, 5, 9, 7, 6, 1, 4, 2, 3],
            [4, 2, 6, 8, 5, 3, 7, 9, 1],
            [7, 1, 3, 9, 2, 4, 8, 5, 6],
            [9, 6, 1, 5, 3, 7, 2, 8, 4],
            [2, 8, 7, 4, 1, 9, 6, 3, 5],
            [3, 4, 5, 2, 8, 6, 1, 7, 9]
        ].map((row, rowIndex) => row.map((value, colIndex) => new Cell({ value, row: rowIndex, column: colIndex })));

        let updatedGrid = updateGrid(grid, new Cell({ value: 5, row: 0, column: 0 }));

        expect(updatedGrid[0][0].isValid).toBe(true);

        updatedGrid = updateGrid(grid, new Cell({ value: 4, row: 0, column: 0 }));

        expect(updatedGrid[0][0].isValid).toBe(false);

        const cell00isValid = grid[0][0].isValid;
        updatedGrid = updateGrid(grid, new Cell({ value: 4, row: grid.length, column: grid.length }));

        expect(updatedGrid[0][0].isValid).toBe(cell00isValid);
    });
});

describe('generateSeed', () => {
    it('should generate a row with unique values', () => {
        const seedRow1 = generateSeed();

        expect(seedRow1).toHaveLength(9);
        expect(new Set(seedRow1).size).toBe(9);

        const seedRow2 = generateSeed();

        expect(seedRow2).toHaveLength(9);
        expect(new Set(seedRow2).size).toBe(9);
        expect(seedRow1).not.toEqual(seedRow2);
    });
});

describe('generateGrid', () => {
    it('should generate a 9x9 grid with unique values in each cells to every row, column, and section', () => {
        const seedRow1 = generateSeed();
        const grid1 = generateGrid(seedRow1);

        expect(isValidGrid(grid1)).toBeTruthy();

        const grid2 = generateGrid(seedRow1);

        expect(isValidGrid(grid2)).toBeTruthy();
        expect(grid1).toEqual(grid2);

        const seedRow2 = generateSeed();
        const grid3 = generateGrid(seedRow2);

        expect(isValidGrid(grid3)).toBeTruthy();
        expect(grid1).not.toEqual(grid3);
    });
});
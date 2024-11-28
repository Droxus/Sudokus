export type Grid = Cell[][];

export class Cell {
  readonly value: number;
  readonly row: number;
  readonly column: number;
  readonly isActive: boolean;
  readonly isValid: boolean;

  constructor({ value, row, column, isActive = false, isValid = true }: any) {
    this.value = value;
    this.row = row;
    this.column = column;
    this.isActive = isActive;
    this.isValid = isValid;
  }
}

export class Section {
  readonly index: number;
  readonly cells: Cell[];

  constructor({ index, cells }: any) {
    this.index = index;
    this.cells = cells;
  }
}

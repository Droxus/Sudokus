export type Grid = Cell[][];

export class Cell {
  readonly value: number;
  readonly row: number;
  readonly column: number;
  readonly isActive: boolean;

  constructor({ value, row, column, isActive = false }: any) {
    this.value = value;
    this.row = row;
    this.column = column;
    this.isActive = isActive;
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

export type Grid = Cell[][];

export class Cell {
  value: number;
  row: number;
  column: number;

  constructor({ value, row, column }: any) {
    this.value = value;
    this.row = row;
    this.column = column;
  }
}

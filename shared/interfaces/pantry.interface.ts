export interface IPantryItem {
  readonly id: string;
  name: string;
  quantity?: number;
  measure?: string;
  weight?: number;
}

export interface IPantry {
  pantry: IPantryItem[];
}

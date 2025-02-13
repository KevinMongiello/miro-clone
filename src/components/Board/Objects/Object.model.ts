export enum ObjectType {
  FreeformLine = 'Freeform Line',
  HorizontalLine = 'Horizontal Line',
  VerticalLine = 'Vertical Line',
  Square = 'Square'
}

export enum ObjectVersion {
  v0 = 'v0',
}

export interface BoardObjectConfig {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  scale?: number;
  fillStyle?: string;
  stroke?: number;
  strokeStyle?: string;
  locked?: boolean;
  selected?: boolean;
  data?: [number, number][];
  type: ObjectType;
  v: ObjectVersion;
}

export type BoardObjectConfigUpdate = Partial<BoardObjectConfig>;

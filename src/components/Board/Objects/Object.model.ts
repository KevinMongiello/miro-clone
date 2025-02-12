export interface BoardObjectConfig {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  scale: number;
  fillStyle?: string;
  stroke?: number;
  strokeStyle?: string;
  locked: boolean;
  selected: boolean;
}

export type BoardObjectConfigUpdate = Partial<BoardObjectConfig>;

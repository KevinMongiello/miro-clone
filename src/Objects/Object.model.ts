export interface BoardObjectConfig {
	x: number;
	y: number;
	width: number;
	height: number;
	rotation: number;
	scale: number;
	locked: boolean;
	fillStyle?: string;
	stroke?: number;
	strokeStyle?: string;
}

export type BoardObjectConfigUpdate = Partial<BoardObjectConfig>;
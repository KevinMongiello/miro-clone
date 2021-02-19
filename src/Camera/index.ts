import { Position, Size, Vector2 } from "../common/types";

export class Camera {
	// Hold onto the original start position, to continuously calculate new position when moving
	public from: Position;
	public x_center: number;
	public y_center: number;
	public zoom: number = 1;

	constructor() {
		this.x_center = window.innerWidth / 2; 
		this.y_center = window.innerHeight / 2;
		this.goTo([this.x_center, this.y_center]);
	}

	public goTo(vector: Vector2) {
		this.x_center = vector[0];
		this.y_center = vector[1]
		this.from = vector;
	}

	public moving = (vector: Vector2, isGlobal = false) => {
		this.x_center = this.from[0] - (isGlobal ? vector[0] : this.toGlobalScale(vector[0]));
		this.y_center = this.from[1] - (isGlobal ? vector[1] : this.toGlobalScale(vector[1]));
	}

	public move = (vector: Vector2, isGlobal = false) => {
		this.moving(vector, isGlobal);
		this.goTo([this.x_center, this.y_center]);
	}

	public setZoom (zoom: number) {
		const coeff = 0.1;
		this.zoom = Math.max(this.zoom + coeff * zoom, 0.1);
	}

	
	public toGlobalPosition(pos: Position): Position {
		return [
			this.x + pos[0] / this.zoom,
			this.y + pos[1] / this.zoom
		];
	}
	public toLocalPosition(pos: Position): Position {
		return [
			(pos[0] - this.x) * this.zoom,
			(pos[1] - this.y) * this.zoom
		];
	}
	
	public toGlobalScale(p: number): number {
		return p / this.zoom;
	}
	public toLocalScale(p: number): number {
		return p * this.zoom;
	}
	
	public toLocalDimensions(dimensions: Size): Size {
		return [
			this.toLocalScale(dimensions[0]),
			this.toLocalScale(dimensions[1])
		]
	}
	
	public get x() { return this.x_center - this.toGlobalScale(window.innerWidth / 2);  }
	public get y() { return this.y_center - this.toGlobalScale(window.innerHeight / 2); }
	public get xmax(): number { return this.x_center + this.toGlobalScale(window.innerWidth / 2); }
	public get ymax(): number { return this.y_center + this.toGlobalScale(window.innerHeight / 2); }
	public get width(): number { return this.xmax - this.x; }
	public get height(): number { return this.ymax - this.y; }

	public get bounds(): [Position, Position] {
		return [
			[this.x, this.y],
			[this.xmax, this.ymax]
		];
	}
}
import { Position, Vector2 } from "../common/types";

export class Camera {
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
		this.from = vector;
	}

	public moving(vector: Vector2) {
		this.x_center = this.from[0] - vector[0];
		this.y_center = this.from[1] - vector[1];
	}

	public move(vector: Vector2) {
		this.moving(vector);
		this.goTo([this.x_center, this.y_center]);
	}

	public setZoom (zoom: number) {
		const coeff = 0.1;
		this.zoom = Math.max(this.zoom + coeff * zoom, 0.1);
	}

	public get x() { return this.x_center - window.innerWidth / (2 * this.zoom); }
	public get y() { return this.y_center - window.innerHeight / (2 * this.zoom); }

	public getGlobal(pos: Position): Position {
		return [
			this.x + pos[0] / this.zoom,
			this.y + pos[1] / this.zoom
		];
	}
}
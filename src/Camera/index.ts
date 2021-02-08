import { Position, Vector2 } from "../common/types";

export class Camera {
	private from: Position;
	private x_center: number;
	private y_center: number;
	private zoom: number = 1;

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

	public setZoom (zoom: number) { this.zoom = zoom; }

	public get x() { return this.x_center - window.innerWidth / 2; }
	public get y() { return this.y_center - window.innerHeight / 2; }
}
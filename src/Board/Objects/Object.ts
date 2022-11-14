import { v4 as uuidv4 } from 'uuid';
import { Position, Size, Vector2 } from '../common/types';
import { Vector2Util } from '../utils/vector';
import { BoardObjectConfig } from './Object.model';

export class BoardObject {
	static defaultOptions: BoardObjectConfig = {
		width: 1,
		height: 1,
		scale: 1,
		x: 0,
		y: 0,
		locked: false,
		rotation: 0,
		fillStyle: 'rgba(100, 149, 237, 0.5)',
		stroke: 0,
		strokeStyle: '#000',
		selected: false
	}
	public x: number;
	public y: number;
	// keep track of last position to use in MoveVector when moving to next position
	private xfrom: number;
	private yfrom: number;
	public height: number;
	public width: number;
	public color: string;
	private fillStyle?: string;
	public stroke?: number;
	private strokeStyle?: string;
	public id: string;
	public selected: boolean = false;
	public locked: boolean = false;

	constructor(...args: any)
	constructor(pos: Position, size: Size, _options: BoardObjectConfig = BoardObject.defaultOptions) {
		const [x, y] = pos;
		const [w, h] = size;
		this.x = x;
		this.y = y;
		this.xfrom = x;
		this.yfrom = y;
		this.width = w;
		this.height = h;
		const options = Object.assign({}, BoardObject.defaultOptions, _options);
		options.fillStyle && (this.fillStyle = options.fillStyle);
		options.stroke && (this.stroke = options.stroke);
		options.strokeStyle && (this.strokeStyle = options.strokeStyle);
		this.id = uuidv4();
	}

	public getFillStyle() {
		return this.selected ? 'rgb(92, 15, 134)' : this.fillStyle;
	}

	public getStrokeStyle() {
		return this.selected ? 'rgb(68, 5, 90)' : this.strokeStyle;
	}

	/**
	 * Spatial Logic
	 */
	public containsPoint(pos: Position) {
		const isLeft = this.x < pos[0];
		const isRight = this.x + this.width > pos[0];
		const isTop = this.y < pos[1];
		const isBottom = this.y + this.height > pos[1];

		return isLeft && isRight && isTop && isBottom;
	}

	public isWithin(p_0: Position, p_1: Position) {
		const [x0, y0, x1, y1] = Vector2Util.standardCoords(p_0, p_1)
		return x0 < this.x  &&
			y0 < this.y &&
			x1 > this.xmax &&
			y1 > this.ymax;
	}

	public containsPoints(p_0: Position, p_1: Position) {
		const verticies: Position[] = [
			p_0,
			[p_1[0], p_0[1]],
			p_1,
			[p_0[0], p_1[1]],
		];

		return verticies.some(vertex => this.containsPoint(vertex));
	}

	public intersects(p_0: Position, p_1: Position) {
		const [left, top, right, bottom] = Vector2Util.standardCoords(p_0, p_1);
		const isWider = left < this.x && right > this.xmax;
		const isLonger = top < this.y && bottom > this.ymax;
		return(
			isWider && (
				(top > this.y && top < this.ymax) ||
				(bottom > this.y && bottom < this.ymax)
			) ||
			isLonger && (
				(left > this.x && left < this.xmax) ||
				(right > this.x && right < this.xmax)
			)
		);
	}

	public tryClick(pos: Position) {
		if (this.containsPoint(pos)) {
			this.selected = true;
		} else {
			this.selected = false;
		}
	}

	public trySelect(p_0: Position, p_1: Position) {
		this.selected = 
			this.containsPoints(p_0, p_1) ||
			this.isWithin(p_0, p_1) ||
			this.intersects(p_0, p_1);
	}

	public moving(vector: Vector2) {
		this.x = this.xfrom + vector[0];
		this.y = this.yfrom + vector[1];
	}

	public move(vector: Vector2) {
		this.moving(vector);
		this.xfrom = this.x;
		this.yfrom = this.y;
	}

	public draw (
		ctx: CanvasRenderingContext2D,
		reposition: (p: Position) => Position,
		rescale: (dim: Vector2) => Vector2
	): void {
		const [obj_x, obj_y] = reposition(this.position);
		const [obj_w, obj_h] = rescale(this.dimensions);

		ctx.fillStyle = this.getFillStyle()!;
		ctx.fillRect(obj_x, obj_y, obj_w, obj_h);

		if (this.stroke) {
			ctx.strokeStyle = this.getStrokeStyle()!;
			ctx.strokeRect(obj_x, obj_y, obj_w, obj_h);
		}
	}

	public get xmax(): number { return this.x + this.width; }
	public get ymax(): number { return this.y + this.height; }
	public get position(): Position { return [this.x, this.y]; }
	public get dimensions(): Position { return [this.width, this.height]; }
}
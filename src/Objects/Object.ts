import { v4 as uuidv4 } from 'uuid';
import { Position, Size } from '../common/types';
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

	public containsPoint(pos: Position) {
		const isLeft = this.x < pos[0];
		const isRight = this.x + this.width > pos[0];
		const isTop = this.y < pos[1];
		const isBottom = this.y + this.height > pos[1];

		return isLeft && isRight && isTop && isBottom;
	}

	get xmax() { return this.x + this.width; }
	get ymax() { return this.y + this.height; }

	public isWithin(p_0: Position, p_1: Position) {
		const [x0, y0, x1, y1] = standardCoords(p_0, p_1)
		return x0 < this.x  &&
			y0 < this.y &&
			x1 > this.xmax &&
			y1 > this.ymax;
	}

	public cointainsPoints(p_0: Position, p_1: Position) {
		const verticies: Position[] = [
			p_0,
			[p_1[0], p_0[1]],
			p_1,
			[p_0[0], p_1[1]],
		];

		return verticies.some(vertex => this.containsPoint(vertex));
	}

	public intersects(p_0: Position, p_1: Position) {
		const [left, top, right, bottom] = standardCoords(p_0, p_1);
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

	public trySelect(p_0: Position, p_1: Position) {
		this.selected = 
			this.cointainsPoints(p_0, p_1) ||
			this.isWithin(p_0, p_1) ||
			this.intersects(p_0, p_1);
	}
}

// returns [x0, y0, x1, y1] where p0 is top-left vertex and p1 is bottom-right.
const standardCoords = (p_0: Position, p_1: Position): [number, number, number, number] => ([
	Math.min(p_0[0], p_1[0]),
	Math.min(p_0[1], p_1[1]),
	Math.max(p_0[0], p_1[0]),
	Math.max(p_0[1], p_1[1])
]);
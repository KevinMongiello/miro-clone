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
		const [top, right, bottom, left] = getBoxEdges(p_0, p_1)
		return left < this.x  &&
			top < this.y &&
			right > this.xmax &&
			bottom > this.ymax;
	}

	public intersects(p_0: Position, p_1: Position) {
		const verticies: Position[] = [
			p_0,
			[p_1[0], p_0[1]],
			p_1,
			[p_0[0], p_1[1]],
		];

		return verticies.some(vertex => this.containsPoint(vertex));
	}
}

// returns [top, right, bottom, left] like a clock.
const getBoxEdges = (p_0: Position, p_1: Position): [number, number, number, number] => ([
	Math.min(p_0[1], p_1[1]),
	Math.max(p_0[0], p_1[0]),
	Math.max(p_0[1], p_1[1]),
	Math.min(p_0[0], p_1[0])
]);
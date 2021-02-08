import { v4 as uuidv4 } from 'uuid';
import { Position, Size } from '../common/types';
import { BoardObjectConfig } from './Object.model';

export class BoardObject {
	static defaultOptions = {
		width: 1,
		height: 1,
		scale: 1,
		x: 0,
		y: 0,
		locked: false,
		rotation: 0,
		fillStyle: 'cornflowerblue',
		stroke: 0,
		strokeStyle: '#000',
	}
	public x: number;
	public y: number;
	public height: number;
	public width: number;
	public color: string;
	public fillStyle: string;
	public stroke: number;
	public strokeStyle: string;
	public id: string;

	constructor(...args: any)
	constructor(pos: Position, size: Size, _options: BoardObjectConfig = BoardObject.defaultOptions) {
		const [x, y] = pos;
		const [w, h] = size;
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
		const options = Object.assign(BoardObject.defaultOptions, _options);
		this.fillStyle = options.fillStyle;
		this.stroke = options.stroke;
		this.strokeStyle = options.strokeStyle;
		this.id = uuidv4();
	}
}
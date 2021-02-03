export interface BoardObjectOptions {
	fillStyle?: string;
	stroke?: number;
	strokeStyle?: string;
}

export class BoardObject {
	static defaultOptions = {
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

	constructor(...args)
	constructor(pos, size, _options: BoardObjectOptions = BoardObject.defaultOptions) {
		const [x, y] = pos;
		this.x = x;
		this.y = y;
		this.width = size;
		this.height = size;
		const options = Object.assign(BoardObject.defaultOptions, _options);
		this.fillStyle = options.fillStyle;
		this.stroke = options.stroke;
		this.strokeStyle = options.strokeStyle;
	}
}
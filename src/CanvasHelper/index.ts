import { Objects } from "../Objects/Objects";

export default class CanvasHelper {
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private objects: Objects;

	constructor(canvas: HTMLCanvasElement, objects: Objects) {
		this.canvas = canvas;
		this.ctx = this.canvas.getContext('2d')!;;
		this.objects = objects;
	} 

	public mountCanvas() {
		const container = document.querySelector('body');
		if (!container) {
			throw Error('The container might not have been mounted in time.')
		}
		this.canvas.width = container.clientWidth || 0;
		this.canvas.height = container.clientHeight || 0;
	}
	
	public render = () => {
		const objects = this.objects.allObjects;
		this.clear();
		// fills
		objects.forEach(obj => {
			this.ctx.fillStyle = obj.fillStyle;
			this.ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
		});
		// strokes
		objects.forEach(obj => {
			if (obj.stroke) {
				this.ctx.strokeStyle = obj.strokeStyle;
				this.ctx.strokeRect(obj.x, obj.y, obj.width, obj.height);
			}
		});
	}

	public clear() {
		const container = document.querySelector('body')!;
		this.ctx.clearRect(0, 0, container.clientWidth, container.clientHeight);
	}
}
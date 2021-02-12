import { Camera } from "../Camera";
import { Objects } from "../Objects/Objects";

export default class CanvasHelper {
	private canvas: HTMLCanvasElement;
	private camera: Camera;
	private ctx: CanvasRenderingContext2D;
	private objects: Objects;
	private requestId: number = 0;

	constructor(canvas: HTMLCanvasElement, camera: Camera, objects: Objects) {
		this.canvas = canvas;
		this.camera = camera;
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

		objects.forEach(obj => {
			const [obj_x, obj_y] = this.camera.toLocalPosition(obj.position);
			const [obj_w, obj_h] = this.camera.toLocalDimensions(obj.dimensions);

			this.ctx.fillStyle = obj.getFillStyle()!;
			this.ctx.fillRect(obj_x, obj_y, obj_w, obj_h);

			if (obj.stroke) {
				this.ctx.strokeStyle = obj.getStrokeStyle()!;
				this.ctx.strokeRect(obj_x, obj_y, obj_w, obj_h);
			}
		});

		this.drawViewer();
	}

	get height () { return this.canvas.height; }
	get width () { return this.canvas.width; }

	drawViewer() {
		this.ctx.fillStyle = 'black';
		this.ctx.font = "20px Georgia";
		const zoom = `Zoom: ${this.camera.zoom}`
		const xCenter = `X (Center): ${this.camera.x_center}`
		const yCenter = `Y (Center): ${this.camera.y_center}`
		this.ctx.fillText(zoom, this.width - 200, this.height - 100);
		this.ctx.fillText(xCenter, this.width - 200, this.height - 80);
		this.ctx.fillText(yCenter, this.width - 200, this.height - 60);
	}

	public clear() {
		const container = document.querySelector('body')!;
		this.ctx.clearRect(0, 0, container.clientWidth, container.clientHeight);
	}

	/**
	 * Animation
	 */
	public runAnimation = () => {
		if (this.requestId) {
			this.requestId = requestAnimationFrame(this.animate);
			this.clear();
			this.render();
		}
	}

	public animate = () => { this.requestId = requestAnimationFrame(this.runAnimation); }
	public freeze() {
		cancelAnimationFrame(this.requestId);
		this.render();
	}
}
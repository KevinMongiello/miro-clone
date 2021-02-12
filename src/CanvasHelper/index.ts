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

		const camera_x = this.camera.x;
		const camera_y = this.camera.y;
		const zoom = this.camera.zoom;

		objects.forEach(obj => {
			this.ctx.fillStyle = obj.getFillStyle()!;
			// Distance from Camera xy is scaled Proportional to zoom
			const object_x_local = (obj.x - camera_x) * zoom;
			const object_y_local = (obj.y - camera_y) * zoom;
			
			// fills
			// Object size is scaled Proportional to zoom
			this.ctx.fillRect(object_x_local, object_y_local, obj.width * zoom, obj.height * zoom);

			// strokes
			if (obj.stroke) {
				this.ctx.strokeStyle = obj.getStrokeStyle()!;
				this.ctx.strokeRect(object_x_local, object_y_local, obj.width * zoom, obj.height * zoom);
			}
		});

		this.drawViewer();
	}

	get height () { return this.canvas.height; }
	get width () { return this.canvas.width; }

	drawViewer() {
		this.ctx.fillStyle = 'black';
		this.ctx.font = "20px Georgia";
		const text1 = `Zoom: ${this.camera.zoom}`
		const text2 = `X (Center): ${this.camera.x_center}`
		const text3 = `Y (Center): ${this.camera.y_center}`
		this.ctx.fillText(text1, this.width - 200, this.height - 100);
		this.ctx.fillText(text2, this.width - 200, this.height - 80);
		this.ctx.fillText(text3, this.width - 200, this.height - 60);
	}

	public clear() {
		const container = document.querySelector('body')!;
		this.ctx.clearRect(0, 0, container.clientWidth, container.clientHeight);
	}

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
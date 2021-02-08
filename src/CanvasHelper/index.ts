import { Camera } from "../Camera";
import { Objects } from "../Objects/Objects";

export default class CanvasHelper {
	private canvas: HTMLCanvasElement;
	private camera: Camera;
	private ctx: CanvasRenderingContext2D;
	private objects: Objects;
	private requestId: number | null = null;

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

		objects.forEach(obj => {
			this.ctx.fillStyle = obj.fillStyle;
			const object_x_local = obj.x - camera_x
			const object_y_local = obj.y - camera_y
			
			// fills
			this.ctx.fillRect(object_x_local, object_y_local, obj.width, obj.height);

			// strokes
			if (obj.stroke) {
				this.ctx.strokeStyle = obj.strokeStyle;
				this.ctx.strokeRect(object_x_local, object_y_local, obj.width, obj.height);
			}
		});
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
		this.requestId = null;
		this.render();
	}
}
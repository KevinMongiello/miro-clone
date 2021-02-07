import { Position } from '../common/types';
import { Objects } from '../Objects/Objects';
import { Tool } from './Tool';
import { Perform } from "./Tool.model";

export class ShapeTool extends Tool {
	constructor() {
		super('shape', 'Sh');
	}

	public performStart: Perform = (render, objects, p_0, p_1) => {
		this.engage();
		objects.createSelectionObject(p_0);
		render();
	}
	
	public performMove: Perform = (render, objects, p_0, p_1) => {
		if (this.engaged) {
			const [x0, y0] = p_0;
			const [x1, y1] = p_1;
			const [width, height] = [x1 - x0, y1 - y0];
			// square for now.
			const size = Math.max(width, height);

			objects.update(objects.getSelectionObject(), { width: size, height: size });
			render();
		}
	}
	
	public performEnd: Perform = (render, objects, p_0, p_1) => {
		this.disengage();
		this.addShape(objects, p_0, p_1);
		objects.removeSelectionObject();
		render();
	}

	public addShape (objects: Objects, p_0: Position, p_1: Position) {
		const [x0, y0] = p_0;
		const [x1, y1] = p_1
		const size = Math.max(x1 - x0, y1 - y0);
		objects.addObject(p_0, size);
	}
}
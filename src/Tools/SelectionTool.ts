import { Tool } from "./Tool";
import { Perform } from "./Tool.model";

export class SelectionTool extends Tool {
	constructor() {
		super('selection', 'S', false);
	}

	public performStart: Perform = (render, objects, p_0) => {
		this.engage();
		objects.createSelectionObject(p_0);
		render();
	}
	
	public performMove: Perform = (render, objects, p_0, p_1) => {
		// TODO: debounce this
		if (this.engaged) {
			const [x0, y0] = p_0;
			const [x1, y1] = p_1;
			const [width, height] = [x1 - x0, y1 - y0];
			
			objects.update(objects.getSelectionObject(), { width, height });
			render();
		}
	}
	
	public performEnd: Perform = (render, objects) => {
		this.disengage();
		objects.removeSelectionObject();
		render();
	}
}
import { Perform } from '../Board/Board.model';

abstract class Tool {
	protected engaged: boolean;
	public name: string;
	public label: string;
	
	constructor(name, label, engaged = false) {
		this.name = name;
		this.label = label;
		this.engaged = engaged;
	}

	protected engage() { this.engaged = true; }
	protected disengage() { this.engaged = false; }

	public abstract performStart?: Perform;
	public abstract performMove?: Perform;
	public abstract performEnd?: Perform;
}

class PanTool extends Tool {
	constructor() {
		super('pan', 'P');
	}

	public performStart: Perform = (render, objects, p_0, p_1) => {
		
	}
}

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

	public addShape (objects, p_0, p_1) {
		const [x0, y0] = p_0;
		const [x1, y1] = p_1
		const size = Math.max(x1 - x0, y1 - y0);
		objects.addObject(...p_0, size);
	}
}


export class SelectionTool extends Tool {
	constructor() {
		super('selection', 'S', false);
	}

	public performStart: Perform = (render, objects, p_0, p_1) => {
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
	
	public performEnd: Perform = (render, objects, p_0, p_1) => {
		this.disengage();
		objects.removeSelectionObject();
		render();
	}
}
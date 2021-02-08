import { Tool } from "./Tool";
import { Perform } from "./Tool.model";

export class SelectionTool extends Tool {
	constructor() {
		super('selection', 'S', false);
	}

	public performStart: Perform = (board, p_0) => {
		this.engage();
		// Check whether or not there is an intersection with an object (and / its handle).
		// if (board.hasIntersection)
		board.createSelection(p_0);
	}
	
	public performMove: Perform = (board, p_0, p_1) => {
		if (!p_1) {
			throw Error('Destination position was not supplied');
		}
		// TODO: animate
		if (this.engaged) {
			const [x0, y0] = p_0;
			const [x1, y1] = p_1;
			const [width, height] = [x1 - x0, y1 - y0];
			
			board.updateSelection({ width, height });
		}
	}
	
	public performEnd: Perform = (board) => {
		this.disengage();
		board.removeSelection();
	}
}
import { Tool } from './Tool';
import { PerformEnd, PerformMove, PerformStart } from './Tool.model';

export class ShapeTool extends Tool {
	constructor() {
		super('shape', 'Sh');
	}

	public performStart: PerformStart = (board, p_0) => {
		this.engage();
		board.createSelection(p_0);
	}
	
	public performMove: PerformMove = (board, p_0, p_1) => {
		if (!p_1) {
			throw Error('Destination position was not supplied');
		}
		if (this.engaged) {
			const [x0, y0] = p_0;
			const [x1, y1] = p_1;
			const [width, height] = [x1 - x0, y1 - y0];

			board.updateSelection({ width, height });
		}
	}
	
	public performEnd: PerformEnd = (board, p_0, p_1) => {
		this.disengage();
		board.addShape(p_0, p_1);
		board.removeSelection();
	}
}
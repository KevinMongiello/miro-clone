import { Tool } from './Tool';
import { PerformEnd, PerformMove, PerformStart } from './Tool.model';

export class ShapeTool extends Tool {
	constructor() {
		super('shape', 'Shape');
	}

	public performStart: PerformStart = (board, p_0_local) => {
		this.engage();
		board.createSelection(
			board.camera.toGlobalPosition(p_0_local)
		);
	}

	public performMove: PerformMove = (board, p_0_local, p_1_local) => {
		if (this.engaged) {
			const p_0 = board.camera.toGlobalPosition(p_0_local);
			const p_1 = board.camera.toGlobalPosition(p_1_local);
			const [x0, y0] = p_0;
			const [x1, y1] = p_1;
			const [width, height] = [x1 - x0, y1 - y0];

			board.updateSelection({ width, height });
		}
	}
	
	public performEnd: PerformEnd = (board, p_0_local, p_1_local) => {
		this.disengage();
		const p_0 = board.camera.toGlobalPosition(p_0_local);
		const p_1 = board.camera.toGlobalPosition(p_1_local);
		board.addShape(p_0, p_1);
		board.removeSelection();
	}
}
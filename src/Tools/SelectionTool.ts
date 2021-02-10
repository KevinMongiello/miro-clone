import { Position } from "../common/types";
import { Tool } from "./Tool";
import { PerformEnd, PerformMove, PerformStart } from "./Tool.model";

export class SelectionTool extends Tool {
	private isDragging: boolean = false;

	constructor() {
		super('selection', 'Sel');
	}

	public performStart: PerformStart = (board, p_0_local) => {
		this.engage();
		
		const p_0_global = board.camera.getGlobal(p_0_local);
		board.createSelection(p_0_global);
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

	private isSelection(p_0: Position, p_1: Position) {
		return Math.max(
			Math.abs(p_1[0] - p_0[0]),
			Math.abs(p_1[1] - p_0[1])
		) > 3
	}
	
	public performEnd: PerformEnd = (board, p_0, p_1) => {
		this.disengage();
		board.removeSelection();
		if (this.isSelection(p_0, p_1)) {
			board.select(p_0, p_1);
		} else {
			board.click(p_1)
		}
	}
}
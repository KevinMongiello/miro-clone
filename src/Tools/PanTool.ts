import { Position, Vector2 } from "../common/types";
import { Tool } from "./Tool";
import { PerformEnd, PerformMove, PerformStart } from "./Tool.model";

export class PanTool extends Tool {
	constructor() {
		super('pan', 'Pan');
	}

	public performStart: PerformStart = () => {
		this.engage();
	}

	getDiff(p_0: Position, p_1: Position): Vector2 {
		const [x0, y0] = p_0;
		const [x1, y1] = p_1;
		return [x1 - x0, y1 - y0];
	}

	public performMove: PerformMove = (board, p_0, p_1) => {
		if (!p_1) {
			throw Error('Destination position was not supplied');
		}
		
		if (this.engaged) {
			board.camera.moving(this.getDiff(p_0, p_1));
		}
	}
	
	public performEnd: PerformEnd = (board, p_0, p_1) => {
		board.camera.move(this.getDiff(p_0, p_1));
		this.disengage();
	}
}

import { BoardObject } from "../Objects/Object";
import { Vector2Util } from "../utils/vector";
import { Tool } from "./Tool";
import { PerformEnd, PerformMove, PerformStart } from "./Tool.model";

export class SelectionTool extends Tool {
	private targets: BoardObject[] | null = null;
	private isMoving: boolean = false;

	constructor() {
		super('selection', 'Sel');
	}

	private reset() {
		this.targets = null;
		this.isMoving = false;
	}

	public performStart: PerformStart = (board, p_0_local) => {
		this.engage();
		
		const p_0 = board.camera.toGlobalPosition(p_0_local);
		const obj = board.getObjectAtPos(p_0);
		const selected = board.getSelected();

		if (obj && selected.includes(obj)) {
			this.targets = selected;
		} else {
			this.targets = obj ? [obj] : null;
		}
		
		if (!this.targets) board.createSelection(p_0);
	}
	
	public performMove: PerformMove = (board, p_0_local, p_1_local) => {
		if (this.engaged) {
			const p_0 = board.camera.toGlobalPosition(p_0_local);
			const p_1 = board.camera.toGlobalPosition(p_1_local);1
			this.isMoving = this.isMoving || Vector2Util.maxDiff(p_1, p_0) > 3;
			const vector = Vector2Util.subtract(p_1, p_0);
			if (this.targets) {
				board.moving(this.targets, vector);
			} else {
				const [width, height] = vector;		
				board.updateSelection({ width, height });
			}
		}
	}
	
	public performEnd: PerformEnd = (board, p_0_local, p_1_local) => {
		this.disengage();
		const p_0 = board.camera.toGlobalPosition(p_0_local);
		const p_1 = board.camera.toGlobalPosition(p_1_local);
		const vector = Vector2Util.subtract(p_1, p_0);
		if (this.targets) {
			this.isMoving && board.move(this.targets, vector);
			!this.isMoving && board.click(p_1);
		} else {
			board.removeSelection();
			board.select(p_0, p_1);
		}
		
		this.reset();
	}
}
import { BoardObject } from "./Object";
import { ObjectsState } from "./ObjectsState";
import _clonedeep from 'lodash.clonedeep';

export class ObjectsHistory {
	private history: ObjectsState[] = [];
	private idx: number = -1;

	constructor(objects?: BoardObject[]) {
		if (objects) {
			this.save(objects);
		}
	}

	public save(objects: BoardObject[]): ObjectsState {
		if (!objects) {
			return this.currentState;
		}

		if (this.hasNext()) {
			// truncate the list and remove undone states
			this.history = this.history.slice(0, this.idx);
		}
		this.history.push(new ObjectsState(objects));
		this.idx++;
		return this.currentState;
	}
	
	public undo() {
		if (this.hasLast()) {
			return this.history[--this.idx];
		} else {
			console.error('Unable to "undo"');
		}
	}
	public redo() {
		if (this.hasNext()) {
			return this.history[++this.idx];
		} else {
			console.error('Unable to "redo".');
		}
	}
	public get currentState(): ObjectsState { return _clonedeep(this.history[this.idx]); }
	public hasLast() { return this.idx > 0; };
	public hasNext() { return this.idx < this.history.length - 1; };
}
import { Objects } from "./Objects";

export class ObjectsState {
	public objects: Objects;

	constructor(objects) {
		this.objects = new Objects(objects);
	}
}

export class ObjectsHistory {
	private history: ObjectsState[] = [];
	private idx: number = -1;

	constructor(objects) {
		if (objects) {
			this.add(objects);
		}
	}

	public add(objects) {
		this.idx++;
		if (this.hasNext()) {
			this.history = this.history.slice(0, this.idx);
		}
		this.history.push(new ObjectsState(objects));
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
	public get currentState() { return this.history[this.idx]; }
	public hasLast() { return this.idx > 0; };
	public hasNext() { return this.idx < this.history.length - 1; };
}
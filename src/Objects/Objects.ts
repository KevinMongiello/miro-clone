import { Position, Size } from "../common/types";
import { BoardObject } from "./Object";
import { BoardObjectConfig, BoardObjectConfigUpdate } from './Object.model'
import { ObjectsHistory } from './ObjectsHistory';
import { ObjectsState } from './ObjectsState';

export class Objects {
	private state: ObjectsState;
	private history: ObjectsHistory;

	constructor(objects = []) {
		Object.assign(this, objects);
		this.history = new ObjectsHistory(objects);
		this.state = this.history.currentState;
	}
	
	/**
	 * State Business Logic
	 */
	private save(objects: BoardObject[] = this.state.userObjects) { 
		this.state = this.history.save(objects);
	 }

	/**
	 * Modifiers
	 */
	private createObject(...args: [Position, Position, BoardObjectConfig?]): BoardObject;
	private createObject(p_0: Position, p_1: Position, options?: BoardObjectConfig) {
		const [x0, y0] = p_0;
		const [x1, y1] = p_1
		const size = [x1 - x0, y1 - y0];
		return new BoardObject(p_0, size, options);
	}

	public addObject(pos: Position, size: Size, options?: BoardObjectConfig): void {
		this.save([
			...this.state.userObjects,
			this.createObject(pos, size, options)
		]);
	}

	getObject(id: string): BoardObject | undefined {
		return this.state.userObjects.find(obj => obj.id = id);
	}

	// Perhaps a premature optimization, but i think it will be much faster
	// to mutate an object, say, the selection object while it is resizing, then to
	// create a new object ever 16ms.
	// Plus, as of now, creating a new object would make a new copy of ObjectState
	public mutateObject(object: BoardObject, changes: BoardObjectConfig): void {
		Object.assign(object, changes);
	}

	// Make a final update which creates a new history state.
	public updateObject(object: string | Object, changes: BoardObjectConfig): void {
		const obj = typeof object === 'string'
			? this.getObject(object) // its an objectId
			: object;
		
		Object.assign(object, changes);
		this.save();
	}

	/**
	 * Getters
	 */
	public get userObjects(): BoardObject[] { return this.state.userObjects; }
	public get gridObjects(): BoardObject[] { return this.state.gridObjects; }
	public get selectionObject (): BoardObject | null { return this.state.selectionObject; }
	public get allObjects(): BoardObject[] {
		return [
			...this.state.userObjects,
			...this.state.gridObjects,
			this.state.selectionObject
		].filter(Boolean) as BoardObject[]
	}

	/**
	 * Selection
	 */
	public createSelectionObject(pos: Position) {
		const options = {
			stroke: 3,
			strokeStyle: 'CornflowerBlue',
			fillStyle: 'rgba(50, 25, 170, 0.035)'
		}
		this.state.selectionObject = new BoardObject(pos, [1, 1], options);
	}
	public updateSelection(settings: BoardObjectConfigUpdate) {
		Object.assign(this.selectionObject, settings);
	}
	public removeSelectionObject() {
		this.state.selectionObject = null;
	}

	/**
	 * History methods
	 */
	public undo() { this.state = this.history.undo() || this.state; }
	public redo() { this.state = this.history.redo() || this.state; }
	public canUndo() { return this.history.hasLast(); }
	public canRedo() { return this.history.hasNext(); }
}
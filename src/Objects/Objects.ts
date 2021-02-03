import { Position } from "../common/types";
import { BoardObject, BoardObjectOptions } from "./Object";

const defaultObjects = {
	useObjects: [new BoardObject([100, -50], 100)]
};

export class Objects {
	private userObjects = [];
	private boardObjects = [];
	private selectionObject = null;

	constructor(objects = defaultObjects) {
		Object.assign(this, objects);
	}

	private setUserObjects(objects) { this.userObjects = objects; }

	private create(...args);
	private create(pos: Position, size: number, options: BoardObjectOptions) {
		return new BoardObject(pos, size, options);
	}

	/**
	 * Getters
	 */
	public getUserObjects() { return this.userObjects; }
	public getBoardObjects() { return this.boardObjects; }
	public getSelectionObject () { return this.selectionObject; }
	public getAllObjects() {
		return [
			...this.getUserObjects(),
			...this.getBoardObjects(),
			this.selectionObject
		].filter(Boolean)
	}

	/**
	 * Biz Logic
	 */
	public addObject(...args) {
		this.setUserObjects([
			...this.userObjects,
			this.create(...args)
		]);
	}
	public createSelectionObject(pos) {
		const options = {
			stroke: 3,
			strokeStyle: 'CornflowerBlue',
			fillStyle: 'rgba(50, 25, 170, 0.035)'
		}
		this.selectionObject = new BoardObject(pos, 1, options);
	}
	public removeSelectionObject() { this.selectionObject = null; }
	public update(object, changes) {
		Object.assign(object, changes);
	}
}
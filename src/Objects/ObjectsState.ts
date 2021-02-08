import { BoardObject } from "./Object";

const defaultGridObjects = null;

export interface ObjectsStateModel {
	userObjects: BoardObject[];
	gridObjects: BoardObject[];
	selectionObject: BoardObject | null;
}

export class ObjectsState implements ObjectsStateModel {
	public userObjects: BoardObject[];
	public gridObjects: BoardObject[];
	public selectionObject: BoardObject | null;

	constructor(objects: BoardObject[]) {
		this.userObjects = objects || [];
		this.gridObjects = defaultGridObjects || [];
		this.selectionObject = null;
	}
}
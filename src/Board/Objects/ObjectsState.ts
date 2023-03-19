import { BoardObject } from "./Object";

export interface ObjectsStateModel {
  userObjects: BoardObject[];
}

export class ObjectsState implements ObjectsStateModel {
  public userObjects: BoardObject[];

  constructor(objects: BoardObject[]) {
    this.userObjects = objects || [];
  }
}
import { BoardObject } from "./Object";
import { ObjectsState } from "./ObjectsState";
import _clonedeep from 'lodash.clonedeep';

export class ObjectsHistory {
  private history: ObjectsState[] = [];
  private idx: number = -1;

  constructor(objects: BoardObject[] = []) {
    this.save(objects);
  }

  public save(objects: BoardObject[]): ObjectsState {
    if (this.hasNext()) {
      // truncate the list and remove undone states
      this.history = this.history.slice(0, this.idx + 1);
    }
    this.history.push(new ObjectsState(objects));
    this.idx++;
    return this.currentState;
  }
  
  public undo(): ObjectsState {
    if (this.hasLast()) {
      this.idx--;
    } else {
      console.error('Unable to "undo"');
    }
    return this.currentState;
  }
  
  public redo(): ObjectsState {
    if (this.hasNext()) {
      this.idx++;
    } else {
      console.error('Unable to "redo".');
    }
    return this.currentState;
  }

  public get currentState(): ObjectsState { return _clonedeep(this.history[this.idx]); }
  public hasLast() { return this.idx > 0; };
  public hasNext() { return this.idx < this.history.length - 1; };
}
import { Position, Size, Vector2 } from '../common/types';
import { FreeformLine } from './FreeformLine';
import { HorizontalLine, VerticalLine } from './LineObject';
import { BoardObject } from './Object';
import { BoardObjectConfig, BoardObjectConfigUpdate, ObjectType } from './Object.model';
import { ObjectsHistory } from './ObjectsHistory';
import { ObjectsState } from './ObjectsState';

// Simulate infinitely long lines
// there might be a more efficient way by updating the grid lines as the camera moves,
// but for now this works.
const INFINITE_LENGTH = 100000;
const defaultGridObjects = [
  ...Array(1000)
    .fill(true)
    .map(
      (_, idx) =>
        new VerticalLine([-50000 + idx * 100, -50000], INFINITE_LENGTH),
    ),
  ...Array(1000)
    .fill(true)
    .map(
      (_, idx) =>
        new HorizontalLine([-50000, -50000 + idx * 100], INFINITE_LENGTH),
    ),
];

export class Objects {
  private state: ObjectsState;
  private history: ObjectsHistory;
  private gridObjects: BoardObject[] = defaultGridObjects;
  private selectionObject: BoardObject | null = null;

  constructor(objects: BoardObjectConfig[] = []) {
    // Object.assign(this, objects);
    const newObjects = objects.map(obj => {
      // this should be simpler.
      // Either store the x/y/w/h or else pos/size, and keep it uniform to the DB.
      if (obj.type === ObjectType.FreeformLine) {
        // data needs to be mapped to global coords...?
        return new FreeformLine(obj);
      } else {
        const pos: Position = [obj.x, obj.y];
        const size: Size = [obj.width, obj.height];
        return new BoardObject(pos, size, obj);
      }
    })
    this.history = new ObjectsHistory(newObjects);
    this.state = this.history.currentState;
  }

  /**
   * State Business Logic
   */
  private save(objects: BoardObject[] = this.state.userObjects) {
    this.state = this.history.save(objects);
  }

  public createObject(...args: [Position, Position, BoardObjectConfig?]): void;
  public createObject(
    p_0: Position,
    p_1: Position,
    options?: BoardObjectConfig,
  ) {
    const [x0, y0] = p_0;
    const [x1, y1] = p_1;
    const size = [x1 - x0, y1 - y0];
    const newObject = new BoardObject(p_0, size, options);
    this.addObject(newObject);
  }

  public addObject(object: BoardObject): void {
    this.save([...this.state.userObjects, object]);
  }

  public getObject(id: string): BoardObject | undefined {
    return this.state.userObjects.find((obj) => (obj.id = id));
  }

  /**
   * Modifiers
   */

  // Perhaps a premature optimization, but I think it will be much faster
  // to mutate an object, say, the selection object while it is resizing, then to
  // create a new object ever 16ms.
  // Plus, as of now, creating a new object would make a new copy of ObjectState
  public mutateObject(object: BoardObject, changes: BoardObjectConfig): void {
    Object.assign(object, changes);
  }

  // Make a final update which creates a new history state.
  public updateObject(
    object: string | Object,
    changes: BoardObjectConfig,
  ): void {
    // apparently unused variable
    // const obj = typeof object === 'string'
    //   ? this.getObject(object) // its an objectId
    //   : object;

    Object.assign(object, changes);
    this.save();
  }

  /**
   * Getters
   */
  public get userObjects(): BoardObject[] {
    return this.state.userObjects;
  }
  public get allObjects(): BoardObject[] {
    return [
      ...this.gridObjects,
      ...this.state.userObjects,
      this.selectionObject,
    ].filter(Boolean) as BoardObject[];
  }
  public getVisible(bounds: [Position, Position]): BoardObject[] {
    // TODO: create a tlbr (top,left,bottom,right) enforcer.
    // bounds should be in [tl, br] format
    return this.allObjects.filter(
      (ob) =>
        ob.isWithin(...bounds) ||
        ob.containsPoints(...bounds) ||
        ob.intersects(...bounds),
    );
  }

  /**
   * Selection
   */
  public createSelectionObject(pos: Position) {
    const options = {
      stroke: 3,
      strokeStyle: 'CornflowerBlue',
      fillStyle: 'rgba(50, 25, 170, 0.035)',
    };
    this.selectionObject = new BoardObject(pos, [1, 1], options);
  }
  public updateSelection(settings: BoardObjectConfigUpdate) {
    // @ts-ignore
    Object.assign(this.selectionObject, settings);
  }
  public removeSelectionObject() {
    this.selectionObject = null;
  }

  public moving(objects: BoardObject[], vector: Vector2) {
    objects.forEach((ob) => {
      ob.moving(vector);
    });
  }
  public move(objects: BoardObject[], vector: Vector2) {
    objects.forEach((ob) => {
      ob.move(vector);
    });
    this.save();
  }

  /**
   * History methods
   */
  public undo() {
    this.state = this.history.undo() || this.state;
  }
  public redo() {
    this.state = this.history.redo() || this.state;
  }
  public canUndo() {
    return this.history.hasLast();
  }
  public canRedo() {
    return this.history.hasNext();
  }
}

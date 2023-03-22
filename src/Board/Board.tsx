import React from 'react';
import { Camera } from './Camera';
import { Position, Vector2 } from './common/types';
import { BoardObjectConfigUpdate } from './Objects/Object.model';
import { Objects } from './Objects/Objects';
import { isRightMouseClick } from './common/isRightMouseClick';
import { PanTool, SelectionTool, ShapeTool, Tool, DrawTool } from './Tools';
import { BoardProps, ControlModel } from './Board.model';
import CanvasHelper from './CanvasHelper';
import { BoardObject } from './Objects/Object';
import MiniDisplay from './MiniDisplay/MiniDisplay';
import Controls from './UI/Controls';
import Tools from './UI/Tools';
import { Vector2Util } from './utils/vector';
import { NavLink } from 'react-router-dom';

import './Board.scss';

const getMousePosition = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>): Position => {
  return [e.clientX, e.clientY];
}

export default class Board extends React.Component<BoardProps> {
  public ctx: CanvasRenderingContext2D;
  public canvas: HTMLCanvasElement;
  public canvasHelper: CanvasHelper;
  public camera: Camera = new Camera();
  public objects: Objects = new Objects();
  private p_0_local: Position;
  private controls: ControlModel[] = [];
  private miniDisplay: MiniDisplay | null;
  private unregisterSpace: () => void;
  private lastTool: Tool | null = null;

  state = {
    currentTool: tools[0]
  };

  /**
   * Initialization
   */

  componentDidMount() {
    this.controls = this.makeControls();
    this.setTool(tools[0]);
    this.canvasHelper = new CanvasHelper(this.canvas, this.camera, this.objects);
    this.canvasHelper.mountCanvas();
    this.freeze();

    this.bindSpaceKey();
  }

  componentWillUnmount() {
    this.unregisterSpace?.();
  }

  bindSpaceKey = () => {
    this.unregisterSpace = this.props.subscribeKeys(['Space'], this.onSpaceDown, this.resetTool)
  }

  onSpaceDown = () => {
    this.lastTool = this.state.currentTool;
    console.log('last tool: ', this.lastTool);
    this.setState({ currentTool: tools.find(t => t.label === 'Pan') });
  }

  resetTool = () => {
    console.log('resetting to the last used tool: ', this.lastTool);
    this.setState({ currentTool: this.lastTool });
    this.lastTool = null;
  }

  /**
   * Getters
   */
  public getObjectAtPos(p_global: Position): BoardObject | undefined {
    return this.userObjects.find(ob => ob.containsPoint(p_global));
  }

  public getSelected(): BoardObject[] {
    return this.userObjects.filter(obj => obj.selected);
  }

  private get userObjects () { return this.objects.userObjects; }

  /**
   * Mouse Mouse Handlers
   */
  private onMouseDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (isRightMouseClick(e))
      return;
    this.p_0_local = getMousePosition(e);
    this.canvasHelper.animate();
    this.state.currentTool.performStart(this, this.p_0_local);
  };
  private onMouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const p_1_local = getMousePosition(e);
    this.state.currentTool.performMove(this, this.p_0_local, p_1_local);
  };
  private onMouseUp = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const p_1_local = getMousePosition(e);
    this.state.currentTool.performEnd(this, this.p_0_local, p_1_local);
    this.freeze();
  };

  makeControls = () => [
    { name: 'undo', label: 'undo', action: this.undo, disabled: !this.getCanUndo },
    { name: 'redo', label: 'redo', action: this.redo, disabled: !this.getCanRedo },
  ];

  getMouseListeners() {
    return {
      onMouseDown: this.onMouseDown,
      onMouseUp: this.onMouseUp,
      onMouseMove: this.onMouseMove,
    };
  }

  /**
   * Camera Bindings
   **/
  toGlobalPosition(pos: Position) {
    return this.camera.toGlobalPosition(pos);
  }

  /**
   * Scroll Handlers
   */
  private onScroll = (e: React.WheelEvent<HTMLCanvasElement>) => {
    const delta = e.deltaY / Math.abs(e.deltaY);
    this.camera.setZoom(delta);
    this.freeze();
  };

  public moving(objects: BoardObject[], vector: Vector2) {
    this.objects.moving(objects, vector);
  }
  public move(objects: BoardObject[], vector: Vector2) {
    this.objects.move(objects, vector);
  }

  /**
   * Shapes
   */
  public addShape (p_0_global: Position, p_1_global: Position) {
    const ltbr = Vector2Util.ltrb(p_0_global, p_1_global);
    this.objects.createObject(ltbr[0], ltbr[1]);
  }
  public addObject (object: BoardObject) {
    this.objects.addObject(object);
  }

  public createSelection = (position: Position) =>                 { this.objects.createSelectionObject(position); }
  public updateSelection = (settings: BoardObjectConfigUpdate) => { this.objects.updateSelection(settings); }
  public removeSelection = () =>                                   { this.objects.removeSelectionObject(); }

  public click(p_global: Position) {
    this.userObjects.forEach(ob => ob.tryClick(p_global));
    this.refresh();
  }

  public select(p_0_global: Position, p_1_global: Position) {
    this.userObjects.forEach(ob => {
      ob.trySelect(p_0_global, p_1_global);
    })
  }

  /**
   * Control Methods
   */

  private refresh()  {
    this.canvasHelper.render();
  }
  public freeze() {
    this.canvasHelper.freeze();
    this.miniDisplay?.renderCanvas();
  }
  private undo = () => {
    this.objects.undo();
    this.canvasHelper.render();
  }
  private redo = () => {
    this.objects.redo();
    this.canvasHelper.render();
  }
  private setTool = (tool: Tool) => { this.setState({ currentTool: tool }); };
  public get getCanUndo() { return this.objects?.canUndo(); }
  public get getCanRedo() { return this.objects?.canRedo(); }

  render() {
    return (
      <div className='board-container'>
        <NavLink id="homeLink"to="/">Home</NavLink>
        <canvas
        {...this.getMouseListeners()}
        onWheel={this.onScroll}
        ref={(el: HTMLCanvasElement) => this.canvas = el}
      />
      <Controls controls={this.controls} />
      <Tools tools={tools} current={this.state.currentTool} setTool={this.setTool} />
      <MiniDisplay
        width={200}
        height={200}
        ref={el => (this.miniDisplay = el)}
        objects={this.objects}
        camera={this.camera}
        board={this}
      />
    </div>
    );
  }
}

const tools = [
  new SelectionTool(),
  new ShapeTool(),
  new PanTool(),
  new DrawTool()
];

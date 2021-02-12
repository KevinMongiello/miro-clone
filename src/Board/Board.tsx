import React from 'react';
import { Position, Vector2 } from '../common/types';
import { BoardObjectConfigUpdate } from '../Objects/Object.model';
import { Objects } from '../Objects/Objects';
import { isRightMouseClick } from '../common/isRightMouseClick';
import { PanTool, SelectionTool, ShapeTool, Tool, DrawTool } from '../Tools';
import { BoardProps, ControlModel } from './Board.model';
import './Board.scss';
import CanvasHelper from '../CanvasHelper';
import { Camera } from '../Camera';
import cn from 'classnames';
import { BoardObject } from '../Objects/Object';


const getMousePosition = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>): Position => {
	return [e.clientX, e.clientY];
}

export default class Board extends React.Component {
	public ctx: CanvasRenderingContext2D;
	public canvas: HTMLCanvasElement;
	public canvasHelper: CanvasHelper;
	private objects: Objects;
	private p_0_local: Position;
	private controls: ControlModel[];
	public camera: Camera;
	
	state = {
		currentTool: tools[0]
	};
	
	/**
	 * Initialization
	 */
	constructor(props: BoardProps) {
		super(props);
		this.controls = this.makeControls();
		this.objects = new Objects();
		this.camera = new Camera();
	}
	
	componentDidMount() {
		this.setTool(tools[0]);
		this.canvasHelper = new CanvasHelper(this.canvas, this.camera, this.objects);
		this.canvasHelper.mountCanvas();
		this.canvasHelper.render()
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
		this.canvasHelper.freeze();
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
		this.refresh();
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
		this.objects.createObject(p_0_global, p_1_global);
	}

	public addObject (object: BoardObject) {
		this.objects.addObject(object);
	}

	createSelection = (position: Position) => {
		this.objects.createSelectionObject(position);
	}
	updateSelection = (settings: BoardObjectConfigUpdate) => {
		this.objects.updateSelection(settings);
	}
	removeSelection= () => {
		this.objects.removeSelectionObject();
	}

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
	private refresh() {
		this.canvasHelper.render();
	}
	private setTool = (tool: Tool) => {
		this.setState({ currentTool: tool });
	};
	private undo = () => {
		this.objects.undo();
		this.canvasHelper.render();
	}
	private redo = () => {
		this.objects.redo();
		this.canvasHelper.render();
	}
	public get getCanUndo() { return this.objects?.canUndo() }
	public get getCanRedo() { return this.objects?.canRedo() }

	render() {
		return (
			<div className='board-container'>
				<canvas
				{...this.getMouseListeners()}
				onWheel={this.onScroll}
				ref={(el: HTMLCanvasElement) => this.canvas = el}
			/>
			<div className='controls ui'>
			{this.controls.map(control => (
					<div className='button' key={control.name} onClick={control.action}>
						{control.label}
					</div>
				))}
			</div>
			<div className='tools ui'>
				{tools.map(tool => {
					const selected = tool.name === this.state.currentTool.name;
					const classNames = cn('button', { selected });
					return (
						<div className={classNames} key={tool.name} onClick={() => this.setTool(tool)}>
							{tool.label}
						</div>
					)
				})}
			</div>
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
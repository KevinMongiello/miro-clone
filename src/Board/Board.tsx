import React from 'react';
import { Position } from '../common/types';
import { BoardObjectConfigUpdate } from '../Objects/Object.model';
import { Objects } from '../Objects/Objects';
import { isRightMouseClick } from '../common/isRightMouseClick';
import { PanTool, SelectionTool, ShapeTool, Tool } from '../Tools';
import { BoardProps, ControlModel } from './Board.model';
import './Board.scss';
import CanvasHelper from '../CanvasHelper';
import { Camera } from '../Camera';
import cn from 'classnames';

const getMousePosition = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>): Position => [e.clientX, e.clientY];

export default class Board extends React.Component {
	public ctx: CanvasRenderingContext2D;
	public canvas: HTMLCanvasElement;
	private canvasHelper: CanvasHelper;
	private objects: Objects;
	private p_0: Position;
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
		window._b = this;
	}
	
	componentDidMount() {
		this.setTool(tools[0]);
		this.canvasHelper = new CanvasHelper(this.canvas, this.camera, this.objects);
		this.canvasHelper.mountCanvas();
		this.canvasHelper.render()
	}

	/**
	 * Mouse Mouse Handlers
	 */
	private onMouseDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
		if (isRightMouseClick(e)) 
			return;
		this.p_0 = getMousePosition(e);
		this.state.currentTool.performStart(this, this.p_0);
		this.canvasHelper.animate();
	};
	private onMouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
		const p_1 = getMousePosition(e);
		this.state.currentTool.performMove(this, this.p_0, p_1);
	};
	private onMouseUp = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
		const p_1 = getMousePosition(e);
		this.state.currentTool.performEnd(this, this.p_0, p_1);
		this.canvasHelper.freeze();
	};

	/**
	 * Shapes
	 */
	public addShape (p_0: Position, p_1: Position) {
		this.objects.addObject(p_0, p_1);
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

	public click(pos: Position) {
		this.objects.userObjects.forEach(ob => {
			if (ob.containsPoint(pos)) {
				ob.selected = true;
			} else {
				ob.selected = false;
			}
		})
		this.refresh();
	}

	public select(p_0: Position, p_1: Position) {
		this.objects.userObjects.forEach(ob => {
			if (ob.intersects(p_0, p_1) || ob.isWithin(p_0, p_1)) {
				ob.selected = true;
			} else {
				ob.selected = false;
			}
		})
	}

	private refresh() {
		this.canvasHelper.render();
	}

	public setTool = (tool: Tool) => {
		this.setState({ currentTool: tool });
	};

	public undo = () => {
		this.objects.undo();
		this.canvasHelper.render();
	}
	public redo = () => {
		this.objects.redo();
		this.canvasHelper.render();
	}

	public get getCanUndo() { return this.objects?.canUndo() }
	public get getCanRedo() { return this.objects?.canRedo() }

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

	render() {
		return (
			<div className='board-container'>
				<canvas
				{...this.getMouseListeners()}
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
	new PanTool()
];
import React from 'react';
import { Position } from '../common/types';
import { BoardObjectConfigUpdate } from '../Objects/Object.model';
import { Objects } from '../Objects/Objects';
import { isRightMouseClick } from '../common/isRightMouseClick';
import { SelectionTool, ShapeTool, Tool } from '../Tools';
import { BoardProps, ControlModel } from './Board.model';
import './Board.scss';

const getMousePosition = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>): Position => [e.clientX, e.clientY];

export default class Board extends React.Component {
	public ctx: CanvasRenderingContext2D;
	public canvas: HTMLCanvasElement;
	private objects: Objects;
	private p_0: Position;
	private currentTool: Tool;
	private controls: ControlModel[];
	
	/**
	 * Initialization
	 */
	constructor(props: BoardProps) {
		super(props);
		this.controls = this.makeControls();
		console.log('constructing Objects');
		this.objects = new Objects();
	}
	
	componentDidMount() {
		this.mountCanvas();
		this.setTool(tools[0]);
		this.ctx = this.canvas.getContext('2d')!;
		this.renderCanvas();
	}

	private mountCanvas() {
		const container = document.querySelector('body');
		if (!container) {
			throw Error('The container might not have been mounted in time.')
		}
		this.canvas.width = container.clientWidth || 0;
		this.canvas.height = container.clientHeight || 0;
	}

	/**
	 * Mouse Mouse Handlers
	 */
	private onMouseDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
		if (isRightMouseClick(e)) 
			return;
		this.p_0 = getMousePosition(e);
		this.currentTool.performStart(this, this.p_0);
		this.renderCanvas();
	};
	private onMouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
		const p_1 = getMousePosition(e);
		this.currentTool.performMove(this, this.p_0, p_1);
		this.renderCanvas();
	};
	private onMouseUp = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
		const p_1 = getMousePosition(e);
		this.currentTool.performEnd(this, this.p_0, p_1);
		this.renderCanvas();
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

	private renderCanvas = () => {
		const objects = this.objects.allObjects;
		this.clear();
		// fills
		objects.forEach(obj => {
			this.ctx.fillStyle = obj.fillStyle;
			this.ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
		});
		// strokes
		objects.forEach(obj => {
			if (obj.stroke) {
				this.ctx.strokeStyle = obj.strokeStyle;
				this.ctx.strokeRect(obj.x, obj.y, obj.width, obj.height);
			}
		});
	}

	private clear() {
		const container = document.querySelector('body')!;
		this.ctx.clearRect(0, 0, container.clientWidth, container.clientHeight);
	}

	public setTool = (tool: Tool) => {
		this.currentTool = tool;
	};

	public undo = () => {
		this.objects.undo();
		this.renderCanvas();
	}
	public redo = () => {
		this.objects.redo();
		this.renderCanvas();
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
			<div className='controls'>
			{this.controls.map(control => (
					<div className='button' key={control.name} onClick={control.action}>
						{control.label}
					</div>
				))}
			</div>
			<div className='tools'>
				{tools.map(tool => (
					<div className='button' key={tool.name} onClick={() => this.setTool(tool)}>
						{tool.label}
					</div>
				))}
			</div>
		</div>
		);
	}
}

const tools = [
	new SelectionTool(),
	new ShapeTool()
];
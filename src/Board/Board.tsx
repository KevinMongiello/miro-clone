import React from 'react';
import { Objects } from '../Objects/Objects';
import { ObjectsHistory } from '../Objects/ObjectsHistory';
import { SelectionTool, ShapeTool } from '../Tools';
import { ControlModel } from './Board.model';
import './Board.scss';

const getEventPos = e => [e.clientX, e.clientY];

export default class Board extends React.Component {
	public ctx: CanvasRenderingContext2D;
	public canvas: HTMLCanvasElement | null;
	private objects: Objects;
	private p_0: number[] | null;
	private currentTool: Tool;
	public history: ObjectsHistory;
	private controls: ControlModel[];
	
	constructor(props) {
		super(props);
		this.canvas = null;
		this.controls = this.makeControls();
	}
	
	componentDidMount() {
		this.mountCanvas();
		this.objects = new Objects();
		this.history = new ObjectsHistory(this.objects);
		this.setTool(tools[0]);
		this.ctx = this.canvas.getContext('2d');
		this.renderCanvas();
	}

	mountCanvas() {
		const container = document.querySelector('body');
		this.canvas.width = container.clientWidth;
		this.canvas.height = container.clientHeight;
	}
	
	private onMouseDown = (e) => {
		this.p_0 = getEventPos(e);
		this.currentTool.performStart(this.renderCanvas, this.objects, this.p_0, undefined);
	};
	private onMouseMove = (e) => {
		const p_1 = getEventPos(e);
		this.currentTool?.performMove(this.renderCanvas, this.objects, this.p_0, p_1);
	};;
	private onMouseUp = (e) => {
		const p_1 = getEventPos(e);
		this.currentTool.performEnd(this.renderCanvas, this.objects, this.p_0, p_1);
	};

	private renderCanvas = () => {
		const objects = this.objects.getAllObjects();
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
		const container = document.querySelector('body');
		this.ctx.clearRect(0, 0, container.clientWidth, container.clientHeight);
	}

	public setTool = (tool: Tool) => {
		this.currentTool = tool;
	};

	public undo = () => {
		this.history.undo();
		this.objects = this.history.currentState.objects;
		this.renderCanvas();
	}
	public redo = () => {
		this.history.redo();
		this.objects = this.history.currentState.objects;
		this.renderCanvas();
	}
	public save = () => {
		this.history.add(this.objects);
	}

	public get getCanUndo() { return this.history?.hasLast() }
	public get getCanRedo() { return this.history?.hasNext() }
	public get isDirty() { return true }

	makeControls = () => [
			{ name: 'undo', label: 'undo', action: this.undo, disabled: !this.getCanUndo },
			{ name: 'redo', label: 'redo', action: this.redo, disabled: !this.getCanRedo },
			{ name: 'save', label: 'save', action: this.save, disabled: !this.isDirty },
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
			<div className='board-container'>``
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
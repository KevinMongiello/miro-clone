import React, { useEffect, useRef, useState } from 'react';
import { Objects } from '../Objects/Objects';
import { ObjectsHistory } from '../Objects/ObjectsHistory';
import { SelectionTool, ShapeTool } from '../Tools/Tools';
import './Board.scss';

const getEventPos = e => [e.clientX, e.clientY];

class Board {
	public ctx: CanvasRenderingContext2D;
	public canvas: HTMLCanvasElement;
	private objects: Objects;
	private p_0: number[] | null;
	private currentTool: Tool;
	public history: ObjectsHistory;
	
	constructor(canvas, ctx, tool) {
		this.canvas = canvas;
		this.ctx = ctx;
		this.objects = new Objects();
		this.history = new ObjectsHistory(this.objects);
		this.setTool(tool);
		this.render();
	}
	
	private onMouseDown = (e) => {
		this.p_0 = getEventPos(e);
		this.currentTool.performStart(this.render, this.objects, this.p_0, undefined);
	};
	private onMouseMove = (e) => {
		const p_1 = getEventPos(e);
		this.currentTool?.performMove(this.render, this.objects, this.p_0, p_1);
	};;
	private onMouseUp = (e) => {
		const p_1 = getEventPos(e);
		this.currentTool.performEnd(this.render, this.objects, this.p_0, p_1);
	};

	private render = () => {
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
		this.render();
	}
	public redo = () => {
		this.history.redo();
		this.objects = this.history.currentState.objects;
		this.render();
	}
	public save = () => {
		this.history.add(this.objects);
	}

	public get getCanUndo() { return this.history.hasLast() }
	public get getCanRedo() { return this.history.hasNext() }
	public get isDirty() { return true }

	getMouseListeners() { 
		return {
			onMouseDown: this.onMouseDown,
			onMouseUp: this.onMouseUp,
			onMouseMove: this.onMouseMove,
		};
	}
}

const tools = [
	new SelectionTool(),
	new ShapeTool()
];

const makeControls = board => [
	{ name: 'undo', label: 'undo', action: board.undo, disabled: !board.getCanUndo },
	{ name: 'redo', label: 'redo', action: board.redo, disabled: !board.getCanRedo },
	{ name: 'save', label: 'save', action: board.save, disabled: !board.isDirty },
];

let board;
let controls = [];

export default function BoardContainer() {
	const canvasRef = useRef(null);
	const [mouseListeners, setMouseListeners] = useState({ onMouseMove: () => console.log('something iswrong, the default mouse listeners should have been overwritten.')});
	
	useEffect(() => {
		const canvas = canvasRef.current;
		const container = document.querySelector('body');
		canvas.width = container.clientWidth;
		canvas.height = container.clientHeight;
		const ctx = canvas.getContext('2d');
		board = new Board(canvas, ctx, tools[0]);
		setMouseListeners(board.getMouseListeners());
		controls = makeControls(board);
	}, [])

	return <div className='board-container'>
			<canvas
			{...mouseListeners}
			ref={canvasRef}
		/>
		<div className='controls'>
		{controls.map(control => (
				<div className='button' key={control.name} onClick={control.action}>
					{control.label}
				</div>
			))}
		</div>
		<div className='tools'>
			{tools.map(tool => (
				<div className='button' key={tool.name} onClick={() => board.setTool(tool)}>
					{tool.label}
				</div>
			))}
		</div>
	</div>
}
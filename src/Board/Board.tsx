import React, { useEffect, useRef, useState } from 'react';
import { Perform } from './Board.model';
import './Board.scss';

abstract class Tool {
	protected engaged: boolean;
	public name: string;
	public label: string;
	
	constructor(name, label, engaged = false) {
		this.name = name;
		this.label = label;
		this.engaged = engaged;
	}

	protected engage() { this.engaged = true; }
	protected disengage() { this.engaged = false; }

	public abstract performStart?: Perform;
	public abstract performMove?: Perform;
	public abstract performEnd?: Perform;
}

class PanTool extends Tool {
	constructor() {
		super('pan', 'P');
	}

	public performStart: Perform = (render, objects, p_0, p_1) => {
		
	}
}

/* code for shape creation tool performEnd: */
// const [x0, y0] = this.p_0;
// const [x1, y1] = getEventPos(e);
// const size = Math.max(x1 - x0, y1 - y0);
// this.objects.addObject(...this.p_0, size);
// this.render()

class SelectionTool extends Tool {
	constructor() {
		super('selection', 'S', false);
	}

	public performStart: Perform = (render, objects, p_0, p_1) => {
		this.engage();
		objects.createSelectionObject(p_0);
		render();
	}
	
	public performMove: Perform = (render, objects, p_0, p_1) => {
		if (this.engaged) {
			const [x0, y0] = p_0;
			const [x1, y1] = p_1;
			const [width, height] = [x1 - x0, y1 - y0];
			
			objects.update(objects.getSelectionObject(), { width, height });
			console.log('selection tool is moving!!!', objects.getSelectionObject())
			render();
		}
	}
	
	public performEnd: Perform = (render, objects, p_0, p_1) => {
		this.disengage();
		objects.removeSelectionObject();
		render();
	}
}

export class BoardObject {
	static defaultOptions = {
		fillStyle: 'violet',
		stroke: 0,
		strokeStyle: '#000',
	}
	public x: number;
	public y: number;
	public height: number;
	public width: number;
	public color: string;
	public fillStyle: string;
	public stroke: number;
	public strokeStyle: string;

	constructor(...args)
	constructor(x, y, size, _options = BoardObject.defaultOptions) {
		this.x = x;
		this.y = y;
		this.width = size;
		this.height = size;
		const options = Object.assign(BoardObject.defaultOptions, _options);
		this.fillStyle = options.fillStyle;
		this.stroke = options.stroke;
		this.strokeStyle = options.strokeStyle;
	}
}

export class Objects {
	private userObjects = [];
	private boardObjects = [];
	private selectionObject = null;

	public getUserObjects() { return this.userObjects; }
	public getBoardObjects() { return this.boardObjects; }
	public getSelectionObject () { return this.selectionObject; }
	public getAllObjects() {
		return [
			...this.getUserObjects(),
			...this.getBoardObjects(),
			this.selectionObject
		].filter(Boolean)
	}

	public addObject(...args) {
		this.userObjects = [...this.userObjects, new BoardObject(...args)]
	}
	public createSelectionObject(pos) {
		const options = {
			stroke: 3,
			strokeStyle: 'CornflowerBlue',
			fillStyle: 'rgba(50, 25, 170, 0.035)'
		}
		this.selectionObject = new BoardObject(...pos, 1, options);
	}
	public removeSelectionObject() {
		this.selectionObject = null;
	}
	public update(object, changes) {
		Object.assign(object, changes);
	}
}

class Singleton {
	static instance = null;
	static get() {
		return this.instance;
	}

	constructor() {
		// @ts-ignore
		if (this.constructor.instance) {
			throw Error(this.constructor.name + ' is a singleton class, and initializiation is only allowed once at startup');
		}
		// @ts-ignore
		this.constructor.instance = this;
	}
}

const getEventPos = e => [e.clientX, e.clientY];

class Board extends Singleton {
	private ctx: CanvasRenderingContext2D;
	private canvas: HTMLCanvasElement;
	private objects: Objects;
	private p_0: number[] | null;
	private currentTool: Tool;
	
	constructor(canvas, ctx, tool) {
		super();
		this.canvas = canvas;
		this.ctx = ctx;
		this.objects = new Objects();
		console.log('setting currentTool via constructor: ', tool);
		this.setTool(tool);
	}
	
	getCanvas() { return this.canvas; }
	getCtx() { return this.ctx; }
	
	private onMouseDown = (e) => {
		this.p_0 = getEventPos(e);
		this.currentTool.performStart(this.render, this.objects, this.p_0, undefined);
	};
	private onMouseMove = (e) => {
		const p_1 = getEventPos(e);
		this.currentTool.performMove(this.render, this.objects, this.p_0, p_1);
	};;
	private onMouseUp = (e) => {
		this.currentTool.performEnd(this.render, this.objects);
	};

	private render = () => {
		const objects = this.objects.getAllObjects();
		this.clear();
		// render fills
		objects.forEach(obj => {
			this.ctx.fillStyle = obj.fillStyle;
			this.ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
		});
		// render strokes
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
		console.log('setting tool via setter: ', tool);
		this.currentTool = tool;
	};

	getMouseListeners() { 
		return {
			onMouseDown: this.onMouseDown,
			onMouseUp: this.onMouseUp,
			onMouseMove: this.onMouseMove,
		};
	}
}

const tools = [
	new SelectionTool()
];

export default function BoardContainer() {
	const canvasRef = useRef(null);
	const [mouseListeners, setMouseListeners] = useState({ onMouseMove: () => console.log('something iswrong, the default mouse listeners should have been overwritten.')});
	const [toolHandler, setToolHandler] = useState(() => undefined);

	useEffect(() => {
		const canvas = canvasRef.current;
		const container = document.querySelector('body');
		canvas.width = container.clientWidth;
		canvas.height = container.clientHeight;
		const ctx = canvas.getContext('2d');
		ctx.fillStyle = 'blue';
		ctx.fillRect(0, 0, 100, 100);
		const board = new Board(canvas, ctx, tools[0]);
		setMouseListeners(board.getMouseListeners());
		// setToolHandler(board.setTool);
	}, [])

	return <div className='board-container'>
			<canvas
			{...mouseListeners}
			ref={canvasRef}
		/>
		<div className='controls'>
			{tools.map(tool => (
				// <div key={tool.name} onClick={() => toolHandler(tool)}>
				<div key={tool.name}>
					{tool.label}
				</div>
			))}
		</div>
	</div>
}
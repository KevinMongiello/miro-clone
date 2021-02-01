import React, { useEffect, useRef, useState } from 'react';
import './Board.css';

class PanTool {
	constructor() {

	}
}

class Object {
	public x: number;
	public y: number;
	public height: number;
	public width: number;
	public color: string;

	constructor(...args)
	constructor(x, y, size, color = 'green') {
		this.x = x;
		this.y = y;
		this.width = size;
		this.height = size;
		this.color = color;
	}
}

class Objects {
	private userObjects = [];
	private boardObjects = [];

	public getUserObjects() { return this.userObjects; }
	public getBoardObjects() { return this.boardObjects; }
	public getAllObjects() {
		return [
			...this.getUserObjects(),
			...this.getBoardObjects()
		]
	}

	public addObject(...args) {
		this.userObjects = [...this.userObjects, new Object(...args)]
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

class Board extends Singleton {
	private ctx: CanvasRenderingContext2D;
	private canvas: HTMLCanvasElement;
	private objects: Objects;
	private p_0: number[] | null;
	
	constructor(canvas, ctx) {
		super();
		this.canvas = canvas;
		this.ctx = ctx;
		this.objects = new Objects();
	}
	
	getCanvas() { return this.canvas; }
	getCtx() { return this.ctx; }
	
	private onMouseDown = (e) => {
		this.p_0 = [e.clientX, e.clientY];
	};
	private onMouseMove() {
		// console.log('move');
	};;
	private onMouseUp = (e) => {
		const [x0, y0] = this.p_0;
		const [x1, y1] = [e.clientX, e.clientY];
		const size = Math.max(x1 - x0, y1 - y0);
		this.objects.addObject(...this.p_0, size);
		this.render()
	};

	private render = () => {
		const objects = this.objects.getUserObjects();
		this.ctx.clearRect(0, 0, 500, 500);
		objects.forEach(obj => {
			this.ctx.fillStyle = obj.color;
			this.ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
		});
	}

	getMouseListeners() { 
		return {
			onMouseDown: this.onMouseDown,
			onMouseUp: this.onMouseUp,
			onMouseMove: this.onMouseMove,
		};
	}
}


export default function BoardContainer() {
	const canvasRef = useRef(null);
	const [mouseListeners, setMouseListeners] = useState({ onMouseMove: () => console.log('something iswrong, the default mouse listeners should have been overwritten.')});

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');
		ctx.fillStyle = 'blue';
		ctx.fillRect(0, 0, 100, 100);
		const board = new Board(canvas, ctx);
		setMouseListeners(board.getMouseListeners());
	}, [])

	return <canvas
		className='board-container'
		{...mouseListeners}
		ref={canvasRef}
		height='500'
		width='500'
	/>;
}
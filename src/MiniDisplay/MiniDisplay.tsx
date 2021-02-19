import React from 'react';
import Board from '../Board/Board';
import { Camera } from '../Camera';
import { Position } from '../common/types';
import { Objects } from '../Objects/Objects';

interface MiniDisplayProps {
	height: number;
	width: number;
	objects: Objects;
	camera: Camera;
	board: Board;
}

const max = 999999999999;

interface Bounds {
	l: number;
	t: number;
	k_w: number;
	k_h: number;
}

export default class MiniDisplay extends React.Component<MiniDisplayProps> {
	private engaged: boolean = false;
	private canvas: HTMLCanvasElement | null;
	private ctx: CanvasRenderingContext2D;
	private p_0: Position;
	private bounds: Bounds;

	componentDidMount() {
		this.ctx = this.canvas?.getContext('2d')!;
	}

	renderCanvas() {
		this.clear();
		this.setBounds();
		this.drawObjects();
		this.drawCamera();
	}
	
	clear() {
		this.ctx.fillStyle = 'white';
		this.ctx.fillRect(0, 0, 300, 300);
	}

	setBounds() {
		const { objects, width, height } = this.props;
		// set init numbers that will be overwritten
		let t = max, r = -max, b = -max, l = max;
		const obs = objects.userObjects;
		
		for (let i = 0; i < obs.length; i++) {
			t = obs[i].y < t ? obs[i].y : t;
			r = obs[i].x > r ? obs[i].xmax : r;
			b = obs[i].y > b ? obs[i].ymax : b;
			l = obs[i].x < l ? obs[i].x : l;
		};

		t = t > -2500 ? -2500 : t;
		b = b < 2500 ? 2500 : b;
		l = l > -2500 ? -2500 : l;
		r = r < 2500 ? 2500 : r;

		const w = r - l;
		const h = b - t;
		// get scaling ƒactors
		const k_w = width / w;
		const k_h = height / h;
		this.bounds = { k_w, k_h, l, t };
	}
	
	drawObjects() {
		const { k_w, k_h, l, t } = this.bounds;
		const obs = this.props.objects.userObjects;
		
		this.ctx.fillStyle = '#ffc0cb77';
		for (let i = 0; i < obs.length; i++) {
			this.ctx.fillRect(
				(obs[i].x - l) * k_w,
				(obs[i].y - t) * k_h,
				obs[i].width * k_w,
				obs[i].height * k_h
				)
			}
		}

	drawCamera() {
		const { k_w, k_h, l, t } = this.bounds;
		const { camera: c } = this.props;
	
		this.ctx.strokeRect(
			(c.x - l) * k_w,
			(c.y - t) * k_h,
			c.width * k_w,
			c.height * k_h
		)
	}

	getEventPosition (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>): Position {
		// @ts-ignore
		var rect = e.target.getBoundingClientRect();
		var x = e.clientX - rect.left;
		var y = e.clientY - rect.top;
		const { k_w, k_h, l, t } = this.bounds;
		return [
			x / k_w + l,
			y / k_h + t
		];
	}

	move (
		e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
		moveFn: (pos: Position, isGlobal: boolean) => void
	) {
		const [x1, y1] = this.getEventPosition(e);
		const [x0, y0] = this.p_0;
		const dx = x1 - x0;
		const dy = y1 - y0;
		moveFn([-dx, -dy], true);
	}

	private onMouseDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
		this.engaged = true;
		this.setBounds();
		this.p_0 = this.getEventPosition(e);
		console.log(this.p_0);
		this.props.camera.goTo(this.p_0);
		this.props.board.freeze();
	};
	private onMouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
		if (this.engaged) {
			this.move(e, this.props.camera.moving);
			this.props.board.freeze();
		}
	};
	private onMouseUp = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
		this.move(e, this.props.camera.move);
		this.engaged = false;
		// Code smell.  there should be a more declarative, less coupled way to do this.
		this.props.board.freeze();
	};

	render() {
		const { height, width } = this.props;
		return (
			<div className='mini-display-container ui'>
				<canvas
					onMouseDown={this.onMouseDown}
					onMouseMove={this.onMouseMove}
					onMouseUp={this.onMouseUp}
					ref={el => this.canvas = el}
					height={height} 
					width={width}
				/>
			</div>
		);
	}
}
import React from 'react';
import { Camera } from '../Camera';
import { Objects } from '../Objects/Objects';

interface MiniDisplayProps {
	height: number;
	width: number;
	objects: Objects;
	camera: Camera;
}

const max = 999999999999;

interface Bounds {
	l: number;
	t: number;
	k_w: number;
	k_h: number;
}

export default class MiniDisplay extends React.Component<MiniDisplayProps> {
	private canvas: HTMLCanvasElement | null;
	private ctx: CanvasRenderingContext2D;

	componentDidMount() {
		this.ctx = this.canvas?.getContext('2d')!;
	}

	renderCanvas() {
		this.clear();
		const bounds = this.getBounds();
		this.drawObjects(bounds);
		this.drawCamera(bounds);
	}
	
	clear() {
		this.ctx.fillStyle = 'white';
		this.ctx.fillRect(0, 0, 300, 300);
	}

	getBounds(): Bounds {
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
		return { k_w, k_h, l, t };
	}
	
	drawObjects(bounds: Bounds) {
		const { k_w, k_h, l, t } = bounds;
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
		
	drawCamera(bounds: Bounds) {
		const { k_w, k_h, l, t } = bounds;
		const { camera: c } = this.props;
	
		this.ctx.strokeRect(
			(c.x - l) * k_w,
			(c.y - t) * k_h,
			c.width * k_w,
			c.height * k_h
		)
	}

	render() {
		const { height, width } = this.props;
		return (
			<div className='mini-display-container ui'>
				<canvas
					ref={el => this.canvas = el}
					height={height} 
					width={width}
				/>
			</div>
		);
	}
}
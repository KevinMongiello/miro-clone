import { Vector2 } from "../common/types";

export const Vector2Util = {
	subtract(p1: Vector2, p0: Vector2): Vector2 {
		return [p1[0] - p0[0], p1[1] - p0[1]];
	},
	add(p1: Vector2, p0: Vector2): Vector2 {
		return [p1[0] + p0[0], p1[1] + p0[1]];
	},
	
	maxDiff(p1: Vector2, p0: Vector2): number {
		const diff = Vector2Util.subtract(p1, p0);
		return Math.max(Math.abs(diff[0]), Math.abs(diff[1]));
	},

	// returns [x0, y0, x1, y1] where p0 is top-left vertex and p1 is bottom-right.
	standardCoords(p_0: Vector2, p_1: Vector2): [number, number, number, number] {
		return ([
			Math.min(p_0[0], p_1[0]), // left
			Math.min(p_0[1], p_1[1]), // top
			Math.max(p_0[0], p_1[0]), // right
			Math.max(p_0[1], p_1[1]) // bottom
		]);
	},

	// Top left, bottom right
	ltrb(p_0: Vector2, p_1: Vector2): Vector2[] {
		const s = this.standardCoords(p_0, p_1);
		return [
			[s[0], s[1]],
			[s[2], s[3]]
		];
	},

	// Left top, right bottom
	tlbr(p_0: Vector2, p_1: Vector2): Vector2[] {
		const s = this.standardCoords(p_0, p_1);
		return [
			[s[1], s[0]],
			[s[3], s[2]]
		];
	}
}
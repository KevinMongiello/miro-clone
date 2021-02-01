import { Objects } from './Board';

export type Perform = (
	render: () => void,
	objects: Objects
	p_0?: number[],
	p_1?: number[],
) => void;
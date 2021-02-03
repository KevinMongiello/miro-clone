import { Position } from '../common/types';
import { Objects } from '../Objects/Objects';

export type Perform = (
	render: () => void,
	objects: Objects
	p_0?: Position,
	p_1?: Position,
) => void;
import Board from '../Board/Board';
import { Position } from '../common/types';

export type Perform = (
	render: Board,
	p_0: Position,
	p_1?: Position,
) => void;
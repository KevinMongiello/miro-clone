import { Position } from '../common/types';
import { BoardObject } from './Object';

export class HorizontalLine extends BoardObject {
  constructor(p_0: Position, length: number) {
    super(p_0, [length, 1]);
  }
}
export class VerticalLine extends BoardObject {
  constructor(p_0: Position, length: number) {
    super(p_0, [1, length]);
  }
}

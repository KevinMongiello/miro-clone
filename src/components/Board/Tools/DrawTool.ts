import { Position, Vector2 } from '../common/types';
import { FreeformLine } from '../Objects/FreeformLine';
import { Tool } from './Tool';
import { PerformEnd, PerformMove, PerformStart } from './Tool.model';

export class DrawTool extends Tool {
  private data: Position[] = [];

  constructor() {
    super('draw', 'Draw');
  }

  private reset() {
    this.data = [];
  }

  /**
   * Core
   */
  public performStart: PerformStart = (board, p_0_local) => {
    this.engage();
    board.canvasHelper.freeze();

    this.data.push(p_0_local);
    // Is it a bad idea to expose canvasHelper and its members (ctx)?
    // Is this too tightly coupled? -- Is there a better alternative?
    board.canvasHelper.ctx.lineWidth = 1;
    board.canvasHelper.ctx.beginPath();
    board.canvasHelper.ctx.moveTo(...p_0_local);
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  public performMove: PerformMove = (board, p_0_local, p_1_local) => {
    if (this.engaged) {
      this.data.push(p_1_local);
      board.canvasHelper.ctx.lineTo(...p_1_local);
      board.canvasHelper.ctx.stroke();
    }
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  public performEnd: PerformEnd = (board, p_0, p_1_local) => {
    this.data.push(p_1_local);
    board.canvasHelper.ctx.lineTo(...p_1_local);
    board.canvasHelper.ctx.stroke();
    const globalPositionData = this.data.map((pos: Position) =>
      board.toGlobalPosition(pos),
    );
    board.addObject(FreeformLine.initializeFromGlobalData(globalPositionData));
    this.disengage();
    this.reset();
  };

  /**
   * Helpers
   */
  getDiff(p_0: Position, p_1: Position): Vector2 {
    const [x0, y0] = p_0;
    const [x1, y1] = p_1;
    return [x1 - x0, y1 - y0];
  }
}

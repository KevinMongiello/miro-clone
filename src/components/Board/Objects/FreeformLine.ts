import { Vector2Util } from '../utils/vector';
import { Position, Vector2 } from '../common/types';
import { BoardObject } from './Object';
import { BoardObjectConfig, ObjectType } from './Object.model';

type DataPoints = Position[];

export class FreeformLine extends BoardObject {
  public data: DataPoints;

  static getBounds(data: DataPoints) {
    let xmin = data[0][0],
      xmax = data[0][0],
      ymin = data[0][1],
      ymax = data[0][1];

    data.forEach((pos: Position) => {
      xmin = Math.min(xmin, pos[0]);
      xmax = Math.max(xmax, pos[0]);
      ymin = Math.min(ymin, pos[1]);
      ymax = Math.max(ymax, pos[1]);
    });

    return [
      [xmin, ymin],
      [xmax - xmin, ymax - ymin],
    ];
  }

  static initializeFromGlobalData(data: any) {
    const [[x, y], [width, height]] = FreeformLine.getBounds(data);
    const newLine = new FreeformLine({
      x,
      y,
      width,
      height,
      data,
    });
    newLine.toObjectSpace();
    return newLine;
  }

  constructor(config: Omit<BoardObjectConfig, 'type' | 'v'>) {
    if (!config.data) {
      throw Error('FreeformLine Object must initialize with data.');
    }

    super([config.x, config.y], [config.width, config.height], {
      type: ObjectType.FreeformLine,
    });
    this.data = config.data;
  }

  // Translate all data points from global space to the object's space.
  public toObjectSpace() {
    this.data = this.data?.map(
      ([x, y]: Position) => [x - this.x, y - this.y] as Position,
    );
  }

  public draw(
    ctx: CanvasRenderingContext2D,
    reposition: (p: Position) => Position,
    rescale: (dim: Vector2) => Vector2,
  ): void {
    const position = reposition(this.position);
    ctx.beginPath();
    ctx.moveTo(...Vector2Util.add(position, rescale(this.data[0])));

    for (let i = 1; i < this.data.length; i++) {
      ctx.lineTo(...Vector2Util.add(position, rescale(this.data[i])));
    }
    ctx.stroke();
  }
}

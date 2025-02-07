import { Camera } from '../Camera';
import { Objects } from '../Objects/Objects';

export default class CanvasHelper {
  private canvas: HTMLCanvasElement;
  private camera: Camera;
  public ctx: CanvasRenderingContext2D;
  private objects: Objects;
  private requestId: number = 0;

  constructor(canvas: HTMLCanvasElement, camera: Camera, objects: Objects) {
    this.canvas = canvas;
    this.camera = camera;
    this.ctx = this.canvas.getContext('2d')!;
    this.objects = objects;
  }

  public mountCanvas() {
    const container = document.querySelector('body');
    if (!container) {
      throw Error('The container might not have been mounted in time.');
    }
    this.canvas.width = container.clientWidth || 0;
    this.canvas.height = container.clientHeight || 0;
  }

  public render = () => {
    // might be costly to render every frame.  Can possibly be cached...
    // const objects = this.objects.getVisible(this.camera.bounds);
    const objects = this.objects.allObjects;
    this.clear();

    objects.forEach((obj) => {
      obj.draw(
        this.ctx,
        this.camera.toLocalPosition.bind(this.camera),
        this.camera.toLocalDimensions.bind(this.camera),
      );
    });

    this.drawInfo();
  };

  get height() {
    return this.canvas.height;
  }
  get width() {
    return this.canvas.width;
  }

  drawInfo() {
    const objects = this.objects.getVisible(this.camera.bounds);
    this.ctx.fillStyle = 'black';
    this.ctx.font = '20px Georgia';
    const zoom = `Zoom: ${this.camera.zoom}`;
    const xCenter = `X (Center): ${this.camera.x_center}`;
    const yCenter = `Y (Center): ${this.camera.y_center}`;
    const objs = `Visible Objects: ${objects.length}`;
    const x = this.width - 420;
    const y = this.height - 100;
    this.ctx.fillText(zoom, x, y);
    this.ctx.fillText(xCenter, x, y + 20);
    this.ctx.fillText(yCenter, x, y + 40);
    this.ctx.fillText(objs, x, y + 60);
  }

  public clear() {
    const container = document.querySelector('body')!;
    this.ctx.clearRect(0, 0, container.clientWidth, container.clientHeight);
  }

  /**
   * Animation
   */
  public runAnimation = () => {
    if (this.requestId) {
      this.requestId = requestAnimationFrame(this.animate);
      this.clear();
      this.render();
    }
  };

  public animate = () => {
    this.requestId = requestAnimationFrame(this.runAnimation);
  };
  public freeze() {
    cancelAnimationFrame(this.requestId);
    this.render();
  }
}

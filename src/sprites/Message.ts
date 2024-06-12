import GameObject from './GameObject'
import Vector2D from './Vector2D'

class Message extends GameObject {
    constructor(
        path: string,
        position: Vector2D,
        width: number,
        height: number,
        canvasPosition: Vector2D,
        canvasWidth: number,
        canvasHeight: number,
    ) {
        super(path, position, width, height, canvasPosition, canvasWidth, canvasHeight, 0)
    }

    public draw(context: CanvasRenderingContext2D): void {
        context.drawImage(
            this.gameObject.image,
            this.gameObject.position.getX(),
            this.gameObject.position.getY(),
            this.gameObject.width,
            this.gameObject.height,
            this.gameObject.canvasPosition.getX(),
            this.gameObject.canvasPosition.getY(),
            this.gameObject.canvasWidth,
            this.gameObject.canvasHeight
        )
    }
    public update(deltaTime: number): void {}
}

export default Message

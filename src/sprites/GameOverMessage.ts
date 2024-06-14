import GameObject from '../abstract/GameObject'
import Vector2D from './Vector2D'

class GameOverMessage extends GameObject {
    constructor(
        path: string,
        position: Vector2D,
        width: number,
        height: number,
        canvasPosition: Vector2D,
        canvasWidth: number,
        canvasHeight: number,
        speed: number
    ) {
        super(path, position, width, height, canvasPosition, canvasWidth, canvasHeight, speed)
    }

    public draw(context: CanvasRenderingContext2D): void {
        super.draw(context);
    }

    public update(deltaTime: number): void {}
}

export default GameOverMessage

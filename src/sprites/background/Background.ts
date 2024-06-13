import GameObject from '../../abstract/GameObject'
import Vector2D from '../Vector2D'

class Background extends GameObject {
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
        context.drawImage(
            this.getImage(),
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

    public update(deltaTime: number): void {
        this.setPath('../../assets/images/background-day.png')
    }
}

export default Background
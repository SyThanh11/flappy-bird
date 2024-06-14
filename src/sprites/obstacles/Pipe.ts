import GameObject from '../../abstract/GameObject'
import Vector2D from '../Vector2D'

class Pipe extends GameObject {
    constructor(
        path: string,
        position: Vector2D,
        width: number,
        height: number,
        canvasPosition: Vector2D,
        canvasWidth: number,
        canvasHeight: number,
        speed: number,
        private space: number
    ) {
        // super(path, new Vector2D(0, 0), 52, 320, canvasPosition, 52, 320, speed);
        super(path, position, width, height, canvasPosition, canvasWidth, canvasHeight, speed)
        this.space = space
    }

    // Getter methods (optional, depending on your use case)
    public getSpace(): number {
        return this.space
    }

    // Setter methods (optional, depending on your use case)
    public setSpace(space: number): void {
        this.space = space
    }

    public draw(context: CanvasRenderingContext2D): void {
        const imgDown: HTMLImageElement = new Image()
        imgDown.src = '../../assets/images/pipe-green-down.png'
        const imgUp: HTMLImageElement = new Image()
        imgUp.src = '../../assets/images/pipe-green.png'

        super.draw(context, imgDown)
        super.draw(
            context,
            imgUp,
            undefined,
            undefined,
            undefined,
            new Vector2D(
                this.gameObject.canvasPosition.getX(),
                this.gameObject.canvasPosition.getY() + this.gameObject.canvasHeight + this.space
            )
        )
    }
    public update(deltaTime: number): void {
        const newX = this.gameObject.canvasPosition.getX() - this.gameObject.speed * deltaTime
        this.gameObject.canvasPosition = new Vector2D(newX, this.gameObject.canvasPosition.getY())
    }
}

export default Pipe

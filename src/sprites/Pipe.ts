import GameObject from './GameObject';
import Vector2D from './Vector2D';

class Pipe extends GameObject {
    constructor(
        canvasPosition: Vector2D,
        speed: number,
        private space: number
    ){
        super('', new Vector2D(0, 0), 52, 320, canvasPosition, 52, 320, speed);
        this.space = space;
    }

    // Getter methods (optional, depending on your use case)
    public getSpace(): number {
        return this.space;
    }

    // Setter methods (optional, depending on your use case)
    public setSpace(space: number): void {
        this.space = space;
    }

    public draw(context: CanvasRenderingContext2D): void {
        const imgDown: HTMLImageElement = new Image();
        imgDown.src = '../../assets/images/pipe-green-down.png';
        const imgUp: HTMLImageElement = new Image();
        imgUp.src = '../../assets/images/pipe-green.png';

        context.drawImage(
            imgDown,
            this.gameObject.position.getX(),
            this.gameObject.position.getY(),
            this.gameObject.width,
            this.gameObject.height,
            this.gameObject.canvasPosition.getX(),
            this.gameObject.canvasPosition.getY(),
            this.gameObject.canvasWidth,
            this.gameObject.canvasHeight
        );
        context.drawImage(
            imgUp,
            this.gameObject.position.getX(),
            this.gameObject.position.getY(), 
            this.gameObject.width,
            this.gameObject.height,
            this.gameObject.canvasPosition.getX(),
            this.gameObject.canvasPosition.getY() + this.gameObject.canvasHeight + this.space,
            this.gameObject.canvasWidth,
            this.gameObject.canvasHeight
        )
    }
    public update(deltaTime: number): void {
        const newX = this.gameObject.canvasPosition.getX() - this.gameObject.speed * deltaTime;
        this.gameObject.canvasPosition = new Vector2D(newX, this.gameObject.canvasPosition.getY());
    }
}

export default Pipe;

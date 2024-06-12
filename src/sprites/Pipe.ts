import Vector2D from './Vector2D';

class Pipe {
    private position: Vector2D;
    private size: Vector2D;
    private speed: number;
    private space: number;

    constructor({ position, size, speed, space }: { position: Vector2D; size: Vector2D; speed: number; space: number }) {
        this.position = position;
        this.size = size;
        this.speed = speed;
        this.space = space;
    }

    // Getter methods (optional, depending on your use case)
    public getPosition(): Vector2D {
        return this.position;
    }
    public getSize(): Vector2D {
        return this.size;
    }
    public getSpeed(): number {
        return this.speed;
    }
    public getSpace(): number {
        return this.space;
    }

    // Setter methods (optional, depending on your use case)
    public setPosition(position: Vector2D): void {
        this.position = position;
    }
    public setSize(size: Vector2D): void {
        this.size = size;
    }
    public setSpeed(speed: number): void {
        this.speed = speed;
    }
    public setSpace(space: number): void {
        this.space = space;
    }

    // Drawing method
    public draw(context: CanvasRenderingContext2D): void {
        context.fillStyle = 'red';
        context.fillRect(this.position.getX(), this.position.getY(), this.size.getX(), this.size.getY());
        context.fillRect(
            this.position.getX(),
            this.position.getY() + this.size.getY() + this.space,
            this.size.getX(),
            this.size.getY()
        );
    }

    // Update method
    public update(deltaTime: number): void {
        const newX = this.position.getX() - this.speed * deltaTime;
        this.setPosition(new Vector2D(newX, this.position.getY()));
    }

}

export default Pipe;

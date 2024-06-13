class Vector2D {
    private x: number
    private y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    public getX(): number {
        return this.x
    }
    public getY(): number {
        return this.y
    }
    public setX(x: number): void {
        this.x = x
    }
    public setY(y: number): void {
        this.y = y
    }

    public add(other: Vector2D): Vector2D {
        return new Vector2D(this.x + other.getX(), this.y + other.getY())
    }

    public subtract(other: Vector2D): Vector2D {
        return new Vector2D(this.x - other.getX(), this.y - other.getY())
    }

    public multiplyScalar(scalar: number): Vector2D {
        return new Vector2D(this.x * scalar, this.y * scalar)
    }

    public divideScalar(scalar: number): Vector2D {
        if (scalar === 0) {
            throw new Error('Cannot divide by zero.')
        }
        return new Vector2D(this.x / scalar, this.y / scalar)
    }

    public Up(): Vector2D {
        return new Vector2D(0, -1)
    }
    public Down(): Vector2D {
        return new Vector2D(0, 1)
    }
    public Left(): Vector2D {
        return new Vector2D(-1, 0)
    }
    public Right(): Vector2D {
        return new Vector2D(1, 0)
    }
}

export default Vector2D

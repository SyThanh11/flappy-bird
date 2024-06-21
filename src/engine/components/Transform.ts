import Vector2D from './Vector2D'

class Transform {
    private position: Vector2D
    private rotation: number
    private scale: Vector2D

    private maxRotation = 120

    constructor(position?: Vector2D, rotation?: number, scale?: Vector2D) {
        this.position = position || new Vector2D(0, 0)
        this.rotation = rotation || 0
        this.scale = scale || new Vector2D(1, 1)
    }

    // getter
    getPosition(): Vector2D {
        return this.position
    }
    getRotation(): number {
        return this.rotation
    }
    getScale(): Vector2D {
        return this.scale
    }

    public getMaxRotation(): number {
        return this.maxRotation
    }
    public getRotationMax(): number {
        return this.maxRotation
    }

    // setter
    setPosition(position: Vector2D): void {
        this.position = position
    }
    setRotation(rotation: number): void {
        this.rotation = rotation
    }
    setScale(scale: Vector2D): void {
        this.scale = scale
    }
    public setMaxRotation(maxRotation: number): void {
        this.maxRotation = maxRotation
    }

    // rotate
    public rotate(degree: number): void {
        this.rotation += degree
        if (this.maxRotation) {
            if (this.rotation > this.maxRotation) {
                this.rotation = this.maxRotation
            } else if (this.rotation < -this.maxRotation) {
                this.rotation = -this.maxRotation
            }
        }
    }

    // reset
    reset(): void {
        this.position = new Vector2D(0, 0)
        this.rotation = 0
        this.scale = new Vector2D(1, 1)
    }
}

export default Transform

import Vector2D from "./Vector2D";

class Transform {
    private position: Vector2D;
    private rotation: Vector2D;
    private scale: Vector2D;

    constructor(position?: Vector2D, rotation?: Vector2D, scale?: Vector2D) {
        this.position = position || new Vector2D(0, 0);
        this.rotation = rotation || new Vector2D(0, 0);
        this.scale = scale || new Vector2D(1, 1);
    }

    // getter
    getPosition(): Vector2D {
        return this.position;
    }
    getRotation(): Vector2D {
        return this.rotation;
    }
    getScale(): Vector2D {
        return this.scale;
    }

    // setter
    setPosition(position: Vector2D): void {
        this.position = position;
    }
    setRotation(rotation: Vector2D): void {
        this.rotation = rotation;
    }
    setScale(scale: Vector2D): void {
        this.scale = scale;
    }

    // reset
    reset(): void {
        this.position = new Vector2D(0, 0);
        this.rotation = new Vector2D(0, 0);
        this.scale = new Vector2D(1, 1);
    }
}

export default Transform;
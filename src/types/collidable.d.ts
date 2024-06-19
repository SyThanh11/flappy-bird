import Vector2D from './Vector2D'

interface Collidable {
    getPosition(): Vector2D
    getWidth(): number
    getHeight(): number
    setPosition(position: Vector2D): void;
    setWidth(width: number): void;
    setHeight(height: number): void;
    isColliding(otherCollider: Collider): boolean
}

export default Collidable;

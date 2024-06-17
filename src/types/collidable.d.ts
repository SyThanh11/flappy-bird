import Vector2D from "./Vector2D";

interface Collidable {
    getPosition(): Vector2D;
    getWidth(): number;
    getHeight(): number;
    isColliding(otherCollider: Collider): boolean;
}

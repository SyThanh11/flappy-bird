import { Collidable } from "../../types/collidable";
import Vector2D from "./Vector2D";

class Collider implements Collidable {
    private position: Vector2D;
    private width: number;
    private height: number;

    constructor(position: Vector2D, width: number, height: number) {
        this.position = position;
        this.width = width;
        this.height = height;
    }

    public getPosition(): Vector2D {
        return this.position;
    }
    public getWidth(): number {
        return this.width;
    }
    public getHeight(): number {
        return this.height;
    }

    public setPosition(position: Vector2D): void {
        this.position = position;
    }
    public setWidth(width: number): void {
        this.width = width;
    }
    public setHeight(height: number): void {
        this.height = height;
    }

    public isColliding(otherCollision: Collider): boolean {
        const thisLeft = this.position.getX();
        const thisRight = this.position.getX() + this.width;
        const thisTop = this.position.getY();
        const thisBottom = this.position.getY() + this.height;

        const otherLeft = otherCollision.getPosition().getX();
        const otherRight = otherCollision.getPosition().getX() + otherCollision.getWidth();
        const otherTop = otherCollision.getPosition().getY();
        const otherBottom = otherCollision.getPosition().getY() + otherCollision.getHeight();

        if(thisRight >= otherLeft && thisLeft <= otherRight && thisBottom >= otherTop && thisTop <= otherBottom){
            return true;
        }

        return false;
    }
}

export default Collider;
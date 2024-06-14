import GameObject from "../abstract/GameObject";
import { GameObjectType } from "../types/general";

class Transform {
    private readonly degree: number = Math.PI / 180;
    private max_rotation: number;
    private protation: number;
    
    constructor(max_rotation: number) {
        this.max_rotation = max_rotation;
    }

    // getter
    public getMaxRotation(): number {
        return this.max_rotation;
    }
    public getRotation(): number {
        return this.protation;
    }
    public getDegree(): number {
        return this.degree;
    }

    // setter
    public setRotation(rotation: number): void {
        this.protation = rotation;
    }
    public setMaxRotation(max_rotation: number): void {
        this.max_rotation = max_rotation;
    }

    // rotate
    public rotateObject(gameObject: GameObjectType, context: CanvasRenderingContext2D): void {
        context.translate(gameObject.canvasPosition.getX(), gameObject.canvasPosition.getY());
        context.rotate(this.protation);
    }
}

export default Transform;
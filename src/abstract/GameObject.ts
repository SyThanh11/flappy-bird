import { GameObjectType } from '../types/general'
import Vector2D from '../sprites/Vector2D'
import CanvasView from '../view/CanvasView'

abstract class GameObject {
    protected gameObject: GameObjectType

    constructor(
        path: string,
        position: Vector2D,
        width: number,
        height: number,
        canvasPosition: Vector2D,
        canvasWidth: number,
        canvasHeight: number,
        speed: number
    ) {
        this.gameObject = {
            path,
            position,
            width,
            height,
            canvasPosition,
            canvasWidth,
            canvasHeight,
            speed,
        }
    }

    // getter
    public getImage(): HTMLImageElement {
        const image = new Image()
        image.src = this.gameObject.path
        return image
    }
    public getPath(): string {
        return this.gameObject.path
    }
    public getPosition(): Vector2D {
        return this.gameObject.position
    }
    public getWidth(): number {
        return this.gameObject.width
    }
    public getHeight(): number {
        return this.gameObject.height
    }
    public getCanvasPosition(): Vector2D {
        return this.gameObject.canvasPosition
    }
    public getCanvasWidth(): number {
        return this.gameObject.canvasWidth
    }
    public getCanvasHeight(): number {
        return this.gameObject.canvasHeight
    }
    public getSpeed(): number {
        return this.gameObject.speed
    }

    // setter
    public setPath(path: string) {
        this.gameObject.path = path
    }
    public setPosition(position: Vector2D): void {
        this.gameObject.position = position
    }
    public setWidth(width: number): void {
        this.gameObject.width = width
    }
    public setHeight(height: number): void {
        this.gameObject.height = height
    }
    public setCanvasPosition(canvasPosition: Vector2D): void {
        this.gameObject.canvasPosition = canvasPosition
    }
    public setCanvasWidth(canvasWidth: number): void {
        this.gameObject.canvasWidth = canvasWidth
    }
    public setCanvasHeight(canvasHeight: number): void {
        this.gameObject.canvasHeight = canvasHeight
    }
    public setSpeed(speed: number): void {
        this.gameObject.canvasHeight = speed
    }

    // abstract method
    public abstract draw(context: CanvasRenderingContext2D): void
    public abstract update(deltaTime: number, gameState?: string, view?: CanvasView): void
}

export default GameObject

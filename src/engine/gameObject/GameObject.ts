import Scene from '../Scene'
import Transform from '../components/Transform'
import Vector2D from '../components/Vector2D'

abstract class GameObject {
    private isStatic: boolean = false
    private isActive: boolean = false
    private layer: number = 0
    constructor(
        private path: string,
        private transform: Transform,
        private width: number,
        private height: number,
        private canvasTransform: Transform,
        private canvasWidth: number,
        private canvasHeight: number
    ) {
        this.path = path
        this.transform = transform
        this.width = width * this.transform.getScale().getX()
        this.height = height * this.transform.getScale().getY()
        this.canvasTransform = canvasTransform
        this.canvasWidth = canvasWidth * this.transform.getScale().getX()
        this.canvasHeight = canvasHeight * this.transform.getScale().getY()
    }

    // getter
    public getImage(): HTMLImageElement {
        const image = new Image()
        image.src = this.path
        return image
    }
    public getTransform(): Transform {
        return this.transform
    }
    public getCanvasTransform(): Transform {
        return this.canvasTransform
    }
    public getWidth(): number {
        return this.width
    }
    public getHeight(): number {
        return this.height
    }
    public getCanvasWidth(): number {
        return this.canvasWidth
    }
    public getCanvasHeight(): number {
        return this.canvasHeight
    }
    public getLayer(): number {
        return this.layer
    }
    public getIsStatic(): boolean {
        return this.isStatic
    }
    public getIsActive(): boolean {
        return this.isActive
    }
    public getPath(): string {
        return this.path
    }
    public getPosition(): Vector2D {
        return this.transform.getPosition()
    }
    public getCanvasPosition(): Vector2D {
        return this.canvasTransform.getPosition()
    }

    public setLayer(layer: number): void {
        this.layer = layer
    }
    public setIsStatic(isStatic: boolean): void {
        this.isStatic = isStatic
    }
    public setActive(isActive: boolean): void {
        this.isActive = isActive
    }
    public setScale(scale: Vector2D): void {
        this.transform.setScale(scale)
        this.width = this.width * this.transform.getScale().getX()
        this.height = this.height * this.transform.getScale().getY()
    }
    public setPath(path: string): void {
        this.path = path
    }
    public setWidth(width: number): void {
        this.width = width
    }
    public setHeight(height: number): void {
        this.height = height
    }
    public setCanvasWidth(canvasWidth: number): void {
        this.canvasWidth = canvasWidth
    }
    public setCanvasHeight(canvasHeight: number): void {
        this.canvasHeight = canvasHeight
    }
    public setPosition(position: Vector2D): void {
        this.transform.setPosition(position)
    }
    public setCanvasPosition(canvasPosition: Vector2D): void {
        this.canvasTransform.setPosition(canvasPosition)
    }

    public abstract start(): void
    public abstract draw(): void
    public abstract update(deltaTime: number): void
    public abstract destroy(): void
}

export default GameObject

import Collider from '../components/Collider'
import Transform from '../components/Transform'
import Vector2D from '../components/Vector2D'
import PositionChangeEvent from '../controller/PositionChangeEvent'

class GameObject {
    private positionChangeEvent: PositionChangeEvent = new PositionChangeEvent()
    private isStatic = false
    private isActive = false
    private layer = 0
    private collider: Collider

    constructor(
        private image: HTMLImageElement,
        private transform: Transform,
        private width: number,
        private height: number,
        private canvasTransform: Transform,
        private canvasWidth: number,
        private canvasHeight: number
    ) {
        this.image = image
        this.transform = transform
        this.width = width * this.transform.getScale().getX()
        this.height = height * this.transform.getScale().getY()
        this.canvasTransform = canvasTransform
        this.canvasWidth = canvasWidth * this.transform.getScale().getX()
        this.canvasHeight = canvasHeight * this.transform.getScale().getY()

        this.collider = new Collider(
            this.getCanvasPosition(),
            this.getCanvasWidth(),
            this.getCanvasHeight()
        )

        this.positionChangeEvent.subscribe((position: Vector2D) => {
            this.collider.setPosition(position)
        })
    }

    // getter
    public getImage(): HTMLImageElement {
        return this.image
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
    public getPosition(): Vector2D {
        return this.transform.getPosition()
    }
    public getCanvasPosition(): Vector2D {
        return this.canvasTransform.getPosition()
    }
    public getCollider(): Collider {
        return this.collider
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
        this.positionChangeEvent.notify(canvasPosition)
    }
    public setImage(image: HTMLImageElement): void {
        this.image = image
    }
    public setCollider(position: Vector2D): void {
        this.collider.setPosition(position)
    }

    public start(): void {}
    public handleInput(event: Event): void {}
    public draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {}
    public update(deltaTime: number): void {}
    public destroy(): void {}
}

export default GameObject

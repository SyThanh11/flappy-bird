import { Vector } from '../types/general'

class Background {
    private backgroundImage: HTMLImageElement = new Image()
    private backgroundPosition: Vector
    private backgroundWidth: number
    private backgroundHeight: number
    private canvasPosition: Vector
    private canvasWidth: number
    private canvasHeight: number

    constructor(
        imagePath: string,
        backgroundPosition: Vector,
        backgroundWidth: number,
        backgroundHeight: number,
        canvasPosition: Vector,
        canvasWidth: number,
        canvasHeight: number,
    ) {
        this.backgroundImage.src = imagePath
        this.backgroundPosition = backgroundPosition
        this.backgroundWidth = backgroundWidth
        this.backgroundHeight = backgroundHeight
        this.canvasPosition = canvasPosition
        this.canvasWidth = canvasWidth
        this.canvasHeight = canvasHeight
    }

    // getter
    public getPosition(): Vector {
        return this.backgroundPosition
    }
    public getWidth(): number {
        return this.backgroundWidth
    }
    public getHeight(): number {
        return this.backgroundHeight
    }
    public getImage(): HTMLImageElement {
        return this.backgroundImage
    }
    public getCanvasPosition(): Vector {
        return this.canvasPosition
    }
    public getCanvasWidth(): number {
        return this.canvasWidth
    }
    public getCanvasHeight(): number {
        return this.canvasHeight
    }

    // secttor
    public setPosition(backgroundPosition: Vector): void {
        this.backgroundPosition = backgroundPosition
    }
    public setWidth(backgroundWidth: number): void {
        this.backgroundWidth = backgroundWidth
    }
    public setHeight(backgroundHeight: number): void {
        this.backgroundHeight = backgroundHeight
    }
    public setImage(imgPath: string): void {
        this.backgroundImage.src = imgPath
    }
    public setCanvasPosition(canvasPosition: Vector): void {
        this.canvasPosition = canvasPosition
    }
    public setCanvasWidth(canvasWidth: number): void {
        this.canvasWidth = canvasWidth
    }
    public setCanvasHeight(canvasHeight: number): void {
        this.canvasHeight = canvasHeight
    }


}

export default Background

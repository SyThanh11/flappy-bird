import { Vector } from '../types/general'

class Ground {
    private groundImage: HTMLImageElement = new Image()
    private groundPosition: Vector
    private groundWidth: number
    private groundHeight: number
    private canvasPosition: Vector
    private canvasWidth: number
    private canvasHeight: number
    private dPosition: Vector
    private groundSpeed: number

    constructor(
        imagePath: string,
        groundPosition: Vector,
        groundWidth: number,
        groundHeight: number,
        canvasPosition: Vector,
        canvasWidth: number,
        canvasHeight: number,
        dPosition: Vector,
        groundSpeed: number,
    ) {
        this.groundImage.src = imagePath
        this.groundPosition = groundPosition
        this.groundWidth = groundWidth
        this.groundHeight = groundHeight
        this.canvasPosition = canvasPosition
        this.canvasWidth = canvasWidth
        this.canvasHeight = canvasHeight
        this.dPosition = dPosition
        this.groundSpeed = groundSpeed
    }

    // getter
    public getPosition(): Vector {
        return this.groundPosition
    }
    public getWidth(): number {
        return this.groundWidth
    }
    public getHeight(): number {
        return this.groundHeight
    }
    public getImage(): HTMLImageElement {
        return this.groundImage
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
    public getdPosition(): Vector {
        return this.dPosition
    }
    public getGroundSpeed(): number {
        return this.groundSpeed
    }

    // secttor
    public setPosition(groundPosition: Vector): void {
        this.groundPosition = groundPosition
    }
    public setWidth(groundWidth: number): void {
        this.groundWidth = groundWidth
    }
    public setHeight(groundHeight: number): void {
        this.groundHeight = groundHeight
    }
    public setImage(groundImage: HTMLImageElement): void {
        this.groundImage = groundImage
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
    public setdPosition(dPosition: Vector): void {
        this.dPosition = dPosition
    }
    public setGroundSpeed(groundSpeed: number): void {
        this.groundSpeed = groundSpeed
    }
}

export default Ground

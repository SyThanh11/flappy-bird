import Transform from '../components/Transform'
import Vector2D from '../components/Vector2D'
import GameObject from './GameObject'

class Text extends GameObject {
    protected resultImages: Map<string, HTMLImageElement>
    protected content: string
    protected positionOffset: Vector2D

    constructor(
        image: HTMLImageElement,
        transform: Transform,
        width: number,
        height: number,
        canvasTransform: Transform,
        canvasWidth: number,
        canvasHeight: number,
        positionOffset: Vector2D
    ) {
        super(image, transform, width, height, canvasTransform, canvasWidth, canvasHeight)
        this.resultImages = new Map()
        this.positionOffset = positionOffset
    }

    public addImage(name: string, image: HTMLImageElement): void {
        this.resultImages.set(name, image)
    }

    public setPositionOffset(positionOffset: Vector2D): void {
        this.positionOffset = positionOffset
    }

    public start(): void {}

    public draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
        if (!this.content || this.content.length === 0) return

        let xOffset = this.positionOffset.getX()
        const yOffset = this.positionOffset.getY()

        for (let i = 0; i < this.content.length; i++) {
            const char = this.content.charAt(i)

            const image = this.resultImages.get(char)

            if (image) {
                ctx.drawImage(
                    image,
                    this.getPosition().getX(),
                    this.getPosition().getY(),
                    image.width,
                    image.height,
                    xOffset,
                    yOffset,
                    this.getCanvasWidth(),
                    this.getCanvasHeight()
                )
                xOffset += this.getCanvasWidth()
            }
        }
    }
}

export default Text

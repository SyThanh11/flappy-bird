import imageMap from '../../play/constant/image';
import Transform from '../components/Transform'
import GameObject from './GameObject'

class Text extends GameObject {
    private resultImages: Map<string, HTMLImageElement>
    private content: string

    constructor(
        path: string,
        transform: Transform,
        width: number,
        height: number,
        canvasTransform: Transform,
        canvasWidth: number,
        canvasHeight: number,
        isStatic: boolean
    ) {
        super(path, transform, width, height, canvasTransform, canvasWidth, canvasHeight, isStatic);
        this.resultImages = new Map()
    }

    public setContent(content: string): void {
        this.content = content;
        this.loadImage();
    }

    public loadImage(){
        if (!this.content || this.content.length === 0) return;

        for (let i = 0; i < this.content.length; i++) {
            const char = this.content.charAt(i);

            if (!this.resultImages.has(char) && imageMap.has(char)) {
                const image = imageMap.get(char);
                if (image instanceof HTMLImageElement) {
                    this.resultImages.set(char, image); 
                } else {
                    console.warn(`Image for character '${char}' is not an instance of HTMLImageElement.`);
                }
            }
        }
    }

    public addImage(name: string, image: HTMLImageElement): void {
        this.resultImages.set(name, image)
    }

    public start(): void {}
   
    public draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
        if (!this.content || this.content.length === 0) return;

        const totalWidth = this.content.length * this.getCanvasWidth();

        let xOffset = (canvas.width - totalWidth) / 2;
        const yOffset = canvas.height / 20;

        for (let i = 0; i < this.content.length; i++) {
            const char = this.content.charAt(i);

            const image = this.resultImages.get(char);

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
                );
                xOffset += this.getCanvasWidth();
            }
        }
    }
    public update(deltaTime: number): void {}
    public destroy(): void {}
}

export default Text;
class Sprite {
    private fps = 60
    private currentFrameIndex = 0
    private lastFrameTime = 0
    private listOfImages: HTMLImageElement[] = []

    constructor() {}

    public getFps(): number {
        return this.fps
    }

    public setFps(fps: number): void {
        this.fps = fps
    }

    public addImage(img: HTMLImageElement): void {
        this.listOfImages.push(img)
    }

    public getImage(): HTMLImageElement {
        return this.listOfImages[this.currentFrameIndex]
    }

    public update(deltaTime: number): void {
        const frameInterval = 1000 / this.fps

        this.lastFrameTime += deltaTime * 1000

        if (this.lastFrameTime >= frameInterval) {
            this.currentFrameIndex = (this.currentFrameIndex + 1) % this.listOfImages.length
            this.lastFrameTime = 0
        }
    }
}

export default Sprite

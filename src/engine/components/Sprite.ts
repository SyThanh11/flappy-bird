class Sprite {
    private fps = 60
    private currentFrameIndex = 0
    private lastFrameTime = 0

    private listOfImages: HTMLImageElement[] = []

    constructor() {}

    // Getter for fps
    public getFps(): number {
        return this.fps
    }

    // Setter for fps
    public setFps(fps: number): void {
        this.fps = fps
    }

    public addImage(img: HTMLImageElement): void {
        this.listOfImages.push(img)
    }

    public getImage(): HTMLImageElement {
        return this.listOfImages[this.currentFrameIndex]
    }

    // Play the animation
    public playAnimation(): void {
        const interval = 1000 / this.fps

        const animate = (timestamp: number) => {
            if (timestamp - this.lastFrameTime >= interval) {
                this.currentFrameIndex = (this.currentFrameIndex + 1) % this.listOfImages.length
                this.lastFrameTime = timestamp
            }
        }
        requestAnimationFrame(animate)
    }
}

export default Sprite

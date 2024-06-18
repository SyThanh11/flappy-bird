class Sprite {
    private fps: number = 60
    private currentFrameIndex: number = 0
    private lastFrameTime: number = 0

    private listOfPaths: string[] = []

    constructor() {}

    // Getter for fps
    public getFps(): number {
        return this.fps
    }

    // Setter for fps
    public setFps(fps: number): void {
        this.fps = fps
    }

    // Add a path to the list
    public addPath(path: string): void {
        this.listOfPaths.push(path)
    }

    // Get the current path (frame) being used
    public getPath(): string {
        return this.listOfPaths[this.currentFrameIndex]
    }

    // Play the animation
    public playAnimation(): void {
        const interval = 1000 / this.fps

        const animate = (timestamp: number) => {
            if (timestamp - this.lastFrameTime >= interval) {
                this.currentFrameIndex++
                if (this.currentFrameIndex >= this.listOfPaths.length) {
                    this.currentFrameIndex = 0
                }
                this.lastFrameTime = timestamp
            }

            // Request next frame
            requestAnimationFrame(animate)
        }

        requestAnimationFrame(animate)
    }
}

export default Sprite

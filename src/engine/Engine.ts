import SceneManager from './scene/SceneManager'

class Engine {
    private lastTime: number = 0
    private deltaTime: number = 0

    constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        this.start(ctx, canvas)
    }

    public start(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
        SceneManager.getInstance().getCurrentScene().start()

        this.lastTime = window.performance.now()
        window.requestAnimationFrame(() => this.gameLoop(ctx, canvas))
    }

    public update(deltaTime: number): void {
        SceneManager.getInstance().getCurrentScene().update(deltaTime)
    }

    public draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
        SceneManager.getInstance().getCurrentScene().draw(ctx, canvas)
    }

    public gameLoop(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
        let currentTime = window.performance.now()
        this.deltaTime = (currentTime - this.lastTime) / 1000
        this.update(this.deltaTime)

        this.draw(ctx, canvas)
        this.lastTime = currentTime
        window.requestAnimationFrame(() => this.gameLoop(ctx, canvas))
    }
}

export default Engine

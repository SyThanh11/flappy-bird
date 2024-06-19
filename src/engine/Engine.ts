import Scene from './Scene'

class Engine {
    private static instance: Engine
    private lastTime: number = 0
    private deltaTime: number = 0

    private scenes: Scene[] = [];
    private currentScene: Scene;

    constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        this.currentScene = new Scene();
        this.start(ctx, canvas);
    }

    public static getInstance(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): Engine {
        if(!Engine.instance) {
            Engine.instance = new Engine(ctx, canvas);
        }
        return Engine.instance
    }

    public setCurrentScene(scene: Scene): void {
        this.currentScene = scene;
    }

    public getCurrentScene(): Scene {
        return this.currentScene;
    }

    public addScene(scene: Scene): void {
        this.scenes.push(scene)
    }

    public findScene(scene: Scene): boolean {
        return this.scenes.some((s) => s === scene);
    }

    public start(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
        this.currentScene.start();

        this.lastTime = window.performance.now();
        window.requestAnimationFrame(() => this.gameLoop(ctx, canvas));
    }

    public update(deltaTime: number): void {
        this.currentScene.update(deltaTime);
    }

    public draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
        this.currentScene.draw(ctx, canvas);
    }

    public gameLoop(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
        let currentTime = window.performance.now();
        this.deltaTime = (currentTime - this.lastTime) / 1000;
        this.update(this.deltaTime);

        this.draw(ctx, canvas);
        this.lastTime = currentTime;
        window.requestAnimationFrame(() => this.gameLoop(ctx, canvas));
    }
}

export default Engine

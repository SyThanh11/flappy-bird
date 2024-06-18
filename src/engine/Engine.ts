import Scene from './Scene'

class Engine {
    private scenes: Scene[] = [];
    private currentScene: Scene;

    public setCurrentScene(scene: Scene): void {
        this.currentScene = scene;
    }

    public getCurrentScene(): Scene {
        return this.currentScene;
    }

    public addScene(scene: Scene): void {
        this.scenes.push(scene)
    }

    public update(deltaTime: number): void {
        this.currentScene.update(deltaTime);
    }

    public draw(): void {
        this.currentScene.draw();
    }

    public findScene(scene: Scene): boolean {
        return this.scenes.some((s) => s === scene);
    }
}

export default Engine

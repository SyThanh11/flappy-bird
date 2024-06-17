import Scene from "./Scene";

class Engine {
    private scenes: Scene[] = [];

    public addScene(scene: Scene): void {
        this.scenes.push(scene);        
    }

    public update(deltaTime: number): void {
        this.scenes.forEach((scene) => {
            scene.update(deltaTime)
        })
    }

    public draw(): void {
        this.scenes.forEach((scene) => {
            scene.draw()
        })
    }
}

export default Engine;
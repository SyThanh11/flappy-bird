import Scene from './Scene'

class SceneManager {
    private static instance: SceneManager
    private listOfScenes: Map<string, Scene>
    private currentScene: Scene

    constructor() {
        this.listOfScenes = new Map<string, Scene>()
    }

    public static getInstance(): SceneManager {
        if (!SceneManager.instance) {
            SceneManager.instance = new SceneManager()
        }
        return SceneManager.instance
    }

    public addScene(name: string, scene: Scene) {
        this.listOfScenes.set(name, scene)
    }

    public getScene(name: string): Scene {
        return this.listOfScenes.get(name) || new Scene()
    }

    public setCurrentScene(name: string) {
        this.currentScene = this.getScene(name)
    }

    public getCurrentScene(): Scene {
        return this.currentScene
    }

    public removeScene(name: string) {
        this.listOfScenes.delete(name)
    }

    public updateScene(name: string, scene: Scene) {
        this.listOfScenes.set(name, scene)
    }

    public update(deltaTime: number) {
        this.listOfScenes.forEach((scene: Scene, _) => {
            if(scene.getIsActive()){
                scene.update(deltaTime)
            }
        })
    }

    public draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        this.listOfScenes.forEach((scene: Scene, _) => {
            if(scene.getIsActive()){
                scene.draw(ctx, canvas)
            }
        })
    }

    public start(){
        this.listOfScenes.forEach((scene: Scene, _) => {
            if(scene.getIsActive()){
                scene.start()
            }
        })
    }
}

export default SceneManager
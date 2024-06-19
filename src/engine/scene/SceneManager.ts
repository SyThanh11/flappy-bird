import Scene from './Scene'

class SceneManager {
    private static instance: SceneManager
    private listOfScenes: Map<string, Scene>
    private currentScene: Scene

    constructor() {
        this.listOfScenes = new Map<string, Scene>()
        this.currentScene = new Scene()
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
}

export default SceneManager

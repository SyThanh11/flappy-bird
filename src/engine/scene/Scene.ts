import GameObject from '../gameObject/GameObject'

class Scene {
    private listOfGameObjects: GameObject[]
    private isActive = false

    constructor() {
        this.listOfGameObjects = []
        this.init()
        this.create()
    }

    public init() {}
    public create() {}

    public addGameObject(gameObject: GameObject) {
        gameObject.start()
        this.listOfGameObjects.push(gameObject)
    }

    public removeGameObject(gameObject: GameObject) {
        gameObject.destroy()
        this.listOfGameObjects.splice(this.listOfGameObjects.indexOf(gameObject), 1)
    }

    public findGameObject(gameObject: GameObject) {
        return this.listOfGameObjects.find((obj) => {
            return obj === gameObject
        })
    }

    public setIsActive(isActive: boolean) {
        this.isActive = isActive
    }

    public getIsActive() {
        return this.isActive
    }

    public getListOfGameObjects(): Array<GameObject> {
        return this.listOfGameObjects
    }

    public addListOfGameObjects(listOfGameObjects: GameObject[]) {
        listOfGameObjects.forEach((gameObject) => {
            this.addGameObject(gameObject)
        })
    }

    public update(deltaTime: number) {
        this.listOfGameObjects.forEach((gameObject) => {
            gameObject.update(deltaTime)
        })
    }

    public sortLayer() {
        this.listOfGameObjects.sort((a, b) => {
            return a.getLayer() - b.getLayer()
        })
    }

    public start() {
        this.listOfGameObjects.forEach((gameObject) => {
            gameObject.start()
        })
    }

    public draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        this.sortLayer()
        this.listOfGameObjects.forEach((gameObject) => {
            gameObject.draw(ctx, canvas)
        })
    }

    public destroy() {
        this.listOfGameObjects.forEach((gameObject) => {
            gameObject.destroy()
        })
    }

    public deleteScene() {
        this.destroy()
        this.listOfGameObjects = []
    }

    public handleInput(_event: Event) {}
}

export default Scene

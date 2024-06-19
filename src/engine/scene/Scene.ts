import GameObject from '../gameObject/GameObject'

class Scene {
    public listOfGameObjects: GameObject[]

    constructor() {
        this.listOfGameObjects = []
    }

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
        ctx.clearRect(0, 0, canvas.width, canvas.height)
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

    public deleteScene(){
        this.destroy()
        this.listOfGameObjects = []
    }
}

export default Scene

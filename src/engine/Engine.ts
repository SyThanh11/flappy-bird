import MouseEventHandler from './controller/MouseEventHandler'
import ResourceManager from './controller/ResourceManager'
import SceneManager from './scene/SceneManager'
import CanvasView from './view/CanvasView'

class Engine {
    private lastTime = 0
    private deltaTime = 0
    private view: CanvasView

    private mouseEventHandler: MouseEventHandler
    private sceneManager: SceneManager = SceneManager.getInstance()
    private resourceManager: ResourceManager = ResourceManager.getInstance()

    constructor(width: number, height: number) {
        this.createCanvas(width, height)
        this.view = new CanvasView('canvas')

        this.mouseEventHandler = MouseEventHandler.getInstance()
        this.sceneManager = SceneManager.getInstance()
        this.resourceManager = ResourceManager.getInstance()

        this.start()
    }

    public createCanvas(width: number, height: number): void {
        const canvas = <HTMLCanvasElement>document.createElement('canvas')
        canvas.setAttribute('id', 'canvas')
        canvas.height = height
        canvas.width = width

        canvas.style.background = 'white'

        document.body.appendChild(canvas)
    }

    public start(): void {
        this.setUp()
        SceneManager.getInstance().start()

        this.lastTime = window.performance.now()

        window.requestAnimationFrame(this.gameLoop)
    }

    public update(deltaTime: number): void {
        SceneManager.getInstance().update(deltaTime)
    }

    public draw(): void {
        SceneManager.getInstance().draw(this.view.getCtx(), this.view.getCanvas())
    }

    public gameLoop = (): void => {
        const currentTime = performance.now()
        this.deltaTime = (currentTime - this.lastTime) / 1000
        this.lastTime = currentTime

        this.update(this.deltaTime)

        this.draw()

        window.requestAnimationFrame(this.gameLoop)
    }

    public setUp(): void {}
}

export default Engine

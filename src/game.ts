import GameManager from './game-manager/GameManager'

class Game {
    private lastTime: number = 0
    private deltaTime: number = 0

    private gameManager: GameManager

    constructor() {
        console.log('Game created')
        this.createCanvas()
        this.gameManager = new GameManager()

        this.gameManager.init()

        this.lastTime = window.performance.now()
        requestAnimationFrame(this.gameLoop)
    }

    public createCanvas(): void {
        const canvas = <HTMLCanvasElement>document.createElement('canvas')
        canvas.setAttribute('id', 'canvas')
        canvas.height = 510
        canvas.width = 800

        canvas.style.background = 'white'

        document.body.appendChild(canvas)
    }

    // ProcessInput
    public processInput = (): void => {
        this.gameManager.handleInputEvent()
    }

    // Draw
    public draw = (): void => {
        this.gameManager.draw()
    }

    // Update
    public update = (deltaTime: number): void => {
        this.gameManager.update(deltaTime)
    }

    // Game Loop
    public gameLoop = (): void => {
        let currentTime = window.performance.now()
        this.deltaTime = (currentTime - this.lastTime) / 1000
        this.processInput()
        this.update(this.deltaTime)

        this.draw()
        this.lastTime = currentTime
        requestAnimationFrame(this.gameLoop.bind(this))
    }
}

new Game()

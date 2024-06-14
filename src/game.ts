import GameManager from './game-manager/GameManager'
import BackgroundManager from './sprites/background/BackgroundManager'
import Bird from './sprites/Bird'
import GroundManager from './sprites/ground/GroundManager'
import Message from './sprites/Message'
import PipeManager from './sprites/obstacles/PipeManager'
import Score from './sprites/Score'
import CanvasView from './view/CanvasView'

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
        requestAnimationFrame(() =>
            this.gameLoop(
                this.gameManager.getView(),
                this.gameManager.getListOfGrounds(),
                this.gameManager.getListOfBackgrounds(),
                this.gameManager.getBird(),
                this.gameManager.getListOfPipes(),
                this.gameManager.getMessage(),
                this.gameManager.getScore()
            )
        )
    }

    public createCanvas(): void {
        const canvas = <HTMLCanvasElement>document.createElement('canvas')
        canvas.setAttribute('id', 'canvas')
        canvas.height = 510
        canvas.width = 800
        canvas.style.background = 'blue'
        document.body.appendChild(canvas)
    }

    // ProcessInput
    public processInput = (): void => {
        // document.addEventListener('click', () => {
        //     if (this.gameManager.getGameState() == 'start') {
        //         this.gameManager.setGameState('play')
                
        //     }
        // })
        this.gameManager.handleInputEvent()
    }

    // Draw
    public draw = (): void => {
        this.gameManager.draw()
    }

    // Update
    public update = (deltaTime: number): void => {
        this.gameManager.update(deltaTime);
    }

    // Game Loop
    public gameLoop = (
        view: CanvasView,
        listGround: GroundManager,
        listBackground: BackgroundManager,
        bird: Bird,
        pipe: PipeManager,
        message: Message,
        score: Score
    ): void => {
        let currentTime = window.performance.now()
        this.deltaTime = (currentTime - this.lastTime) / 1000
        this.lastTime = currentTime


        this.processInput()

        this.update(this.deltaTime)

        this.draw()

        

        requestAnimationFrame(() =>
            this.gameLoop(view, listGround, listBackground, bird, pipe, message, score)
        )
    }
}

new Game()

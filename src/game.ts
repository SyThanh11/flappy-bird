import GameManager from './gameManager/GameManager'
import { random } from './helper/helper'
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
        document.addEventListener('click', () => {
            if (this.gameManager.getGameState() == 'start') {
                this.gameManager.setGameState('play')
                this.gameManager.getScore().setGameState(this.gameManager.getGameState())
            }
        })
    }

    // Draw
    public draw = (): void => {
        this.gameManager.getView().clear()
        this.gameManager.getListOfBackgrounds().draw(this.gameManager.getView().getCtx())
        if (this.gameManager.getGameState() == 'start') {
            this.gameManager.getMessage().draw(this.gameManager.getView().getCtx())
        }
        if (this.gameManager.getGameState() == 'play') {
            this.gameManager
                .getScore()
                .draw(this.gameManager.getView().getCtx(), this.gameManager.getView().getCanvas())
        }
        this.gameManager.getListOfPipes().draw(this.gameManager.getView().getCtx())
        this.gameManager.getListOfGrounds().draw(this.gameManager.getView().getCtx())
        this.gameManager.getBird().draw(this.gameManager.getView().getCtx())
    }

    // Update
    public update = (deltaTime: number): void => {
        this.gameManager.update()
        this.gameManager
            .getBird()
            .update(deltaTime, this.gameManager.getGameState(), this.gameManager.getView())
        if (this.gameManager.getGameState() == 'play') {
            // this.gameManager.getListOfBackgrounds().update(deltaTime)
            this.gameManager.getListOfGrounds().update(deltaTime)
            this.gameManager
                .getListOfPipes()
                .update(
                    deltaTime,
                    this.gameManager.getView().getCanvas(),
                    random(600, 620),
                    random(-200, -100),
                    random(60, 80)
                )
        } else if (this.gameManager.getGameState() == 'end') {

        }
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

        this.processInput()

        this.update(this.deltaTime)

        this.draw()

        this.lastTime = currentTime

        requestAnimationFrame(() =>
            this.gameLoop(view, listGround, listBackground, bird, pipe, message, score)
        )
    }
}

new Game()

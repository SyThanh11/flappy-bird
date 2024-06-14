import { random } from '../helper/helper'
import Transform from '../general/Transform'
import Bird from '../sprites/Bird'
import Message from '../sprites/Message'
import Score from '../sprites/Score'
import Vector2D from '../sprites/Vector2D'
import Background from '../sprites/background/Background'
import BackgroundManager from '../sprites/background/BackgroundManager'
import Ground from '../sprites/ground/Ground'
import GroundManager from '../sprites/ground/GroundManager'
import Pipe from '../sprites/obstacles/Pipe'
import PipeManager from '../sprites/obstacles/PipeManager'
import CanvasView from '../view/CanvasView'
import GameOverMessage from '../sprites/GameOverMessage'

class GameManager {
    private gameState: string
    private listOfGrounds: GroundManager
    private listOfBackgrounds: BackgroundManager
    private listOfPipes: PipeManager
    private bird: Bird
    private message: Message
    private score: Score
    private gameOverMessage: GameOverMessage
    private view: CanvasView

    constructor() {
        this.gameState = 'start'
        this.listOfGrounds = new GroundManager([])
        this.listOfBackgrounds = new BackgroundManager([])
        this.listOfPipes = new PipeManager([])
        this.view = new CanvasView('canvas')
    }

    // getter
    public getGameState(): string {
        return this.gameState
    }
    public getListOfGrounds(): GroundManager {
        return this.listOfGrounds
    }
    public getListOfBackgrounds(): BackgroundManager {
        return this.listOfBackgrounds
    }
    public getListOfPipes(): PipeManager {
        return this.listOfPipes
    }
    public getBird(): Bird {
        return this.bird
    }
    public getMessage(): Message {
        return this.message
    }
    public getScore(): Score {
        return this.score
    }
    public getGameOverMessage(): GameOverMessage {
        return this.gameOverMessage
    }
    public getView(): CanvasView {
        return this.view
    }

    // setter
    public setGameState(gameState: string): void {
        this.gameState = gameState
    }
    public setListOfGrounds(listOfGrounds: GroundManager): void {
        this.listOfGrounds = listOfGrounds
    }
    public setListOfBackgrounds(listOfBackgrounds: BackgroundManager): void {
        this.listOfBackgrounds = listOfBackgrounds
    }
    public setListOfPipes(listOfPipes: PipeManager): void {
        this.listOfPipes = listOfPipes
    }
    public setBird(bird: Bird): void {
        this.bird = bird
    }
    public setMessage(message: Message): void {
        this.message = message
    }
    public setScore(score: Score): void {
        this.score = score
    }
    public setGameOverMessage(gameOverMessage: GameOverMessage): void {
        this.gameOverMessage = gameOverMessage
    }
    public setView(view: CanvasView): void {
        this.view = view
    }

    public init = (): void => {
        this.listOfGrounds.create(
            4,
            new Ground(
                '../assets/images/base.png',
                new Vector2D(0, 0),
                336,
                112,
                new Vector2D(336, 510 - 112),
                336,
                112,
                100
            )
        )
        this.listOfBackgrounds.create(
            3,
            new Background(
                '../assets/images/background-night.png',
                new Vector2D(0, 0),
                288,
                512,
                new Vector2D(288, 0),
                288,
                512,
                0
            )
        )
        this.listOfPipes.create(
            4,
            new Pipe(
                '',
                new Vector2D(0, 0),
                52,
                320,
                new Vector2D(random(800, 850), random(-200, -100)),
                52,
                320,
                200,
                70
            )
        )
        this.bird = new Bird(
            '../../assets/images/yellowbird-downflap.png',
            new Vector2D(0, 0),
            34,
            24,
            new Vector2D(this.view.getCanvas().width / 4, (this.view.getCanvas().height - 24) / 2),
            34,
            24,
            0,
            0,
            9.8,
            100,
            new Transform(120)
        )
        this.message = new Message(
            '../assets/images/message.png',
            new Vector2D(0, 0),
            184,
            267,
            new Vector2D(
                (this.view.getCanvas().width - 184) / 2,
                (this.view.getCanvas().height - 350) / 2
            ),
            184,
            267,
            0
        )
        this.score = new Score()
        this.gameOverMessage = new GameOverMessage(
            '../../assets/images/sprite.png',
            new Vector2D(175, 228),
            225,
            202,
            new Vector2D(
                (this.view.getCanvas().width - 225*1.3) / 2,
                90
                // (this.view.getCanvas().height - 350) / 2
            ),
            225*1.3,
            202*1.3,
            0
        )
    }

    // handleInputEvent
    public handleInputEvent = (): void => {
        document.addEventListener("click", () => {
            if(this.gameState == 'start'){
                this.gameState = 'play';
            }
            if(this.gameState == 'over'){
                this.gameState = 'play';
                this.init();
                this.score.reset();
            } 
        })
    }

    // draw
    public draw(): void {
        this.view.clear()
        this.listOfBackgrounds.draw(this.view.getCtx())
        if (this.gameState == 'start') {
            this.message.draw(this.view.getCtx())
            this.listOfGrounds.draw(this.view.getCtx())
            this.bird.draw(this.view.getCtx())
        } else if (this.gameState == 'play') {
            this.listOfPipes.draw(this.view.getCtx())
            this.listOfGrounds.draw(this.view.getCtx())
            this.bird.draw(this.view.getCtx())
            this.score.draw(this.view.getCtx(), this.view.getCanvas(), this.gameState)
        } else {
            this.listOfPipes.draw(this.view.getCtx())
            this.listOfGrounds.draw(this.view.getCtx())
            this.bird.draw(this.view.getCtx())
            this.gameOverMessage.draw(this.view.getCtx())
            this.score.draw(this.view.getCtx(), this.view.getCanvas(), this.gameState)
        }
    }

    // update
    public update(deltaTime: number): void {
        this.bird.update(deltaTime, this.gameState, this.view)
        if (this.gameState === 'play') {
            this.listOfGrounds.update(deltaTime)
            this.listOfPipes.update(
                deltaTime,
                this.view.getCanvas(),
                random(400, 420),
                random(-200, -100),
                random(60, 80)
            )
            this.increaseScore()
            if (this.isCollide()) {
                this.gameState = 'over'
                // this.bird.setSpeed(0);
                this.bird.setJumpSpeed(0)
            }
        } else if (this.gameState == 'over') {
            this.bird.update(deltaTime, this.gameState, this.view)
            this.updateHighScore()
        }
    }

    // logic
    public isCollide(): boolean {
        let collide = false

        // check collision with pipes
        if (
            this.bird.getCanvasPosition().getX() + this.bird.getCanvasWidth() / 2 >=
                this.listOfPipes.getListOfGameObjects()[0].getCanvasPosition().getX() &&
            this.bird.getCanvasPosition().getX() <
                this.listOfPipes.getListOfGameObjects()[0].getCanvasPosition().getX() +
                    this.listOfPipes.getListOfGameObjects()[0].getWidth() &&
            (this.bird.getCanvasPosition().getY() <
                this.listOfPipes.getListOfGameObjects()[0].getCanvasPosition().getY() +
                    this.listOfPipes.getListOfGameObjects()[0].getHeight() ||
                this.bird.getCanvasPosition().getY() + this.bird.getCanvasHeight() / 2 >
                    this.listOfPipes.getListOfGameObjects()[0].getCanvasPosition().getY() +
                        this.listOfPipes.getListOfGameObjects()[0].getHeight() +
                        this.listOfPipes.getListOfGameObjects()[0].getSpace())
        ) {
            collide = true
        }

        // Check collision with base
        if (
            this.bird.getCanvasPosition().getY() + this.bird.getCanvasHeight() / 2 >=
            this.view.getCanvas().height -
                this.listOfGrounds.getListOfGameObjects()[0].getCanvasHeight()
        ) {
            this.bird
                .getCanvasPosition()
                .setY(
                    this.view.getCanvas().height -
                        this.listOfGrounds.getListOfGameObjects()[0].getCanvasHeight() -
                        this.bird.getCanvasHeight() / 2
                )
            collide = true
        }

        return collide
    }

    public increaseScore(): void {
        if (this.listOfPipes.getIsDestroyed()) {
            this.score.setIsScore(true)
        }

        if (
            this.score.getIsScore() &&
            this.bird.getCanvasPosition().getX() >
                this.listOfPipes.getListOfGameObjects()[0].getCanvasPosition().getX() +
                    this.listOfPipes.getListOfGameObjects()[0].getWidth()
        ) {
            this.score.setScore(this.score.getScore() + 1)
            this.score.setIsScore(false)
            this.listOfPipes.setIsDestroyed(false)
        }
    }

    public updateHighScore(): void {
        this.score.setIsScore(false)
        this.listOfPipes.setIsDestroyed(false)
        localStorage.setItem('SCORE', String(this.score.getScore()))
        if (localStorage.getItem('HIGHSCORE')) {
            let score = localStorage.getItem('SCORE')
            let highScore = localStorage.getItem('HIGHSCORE')
            if (Number(score) > Number(highScore)) {
                localStorage.setItem('HIGHSCORE', String(score))
            }
        } else {
            localStorage.setItem('HIGHSCORE', String(this.score.getScore()))
        }
        this.score.setBestScore(Number(localStorage.getItem('HIGHSCORE')))
    }
}

export default GameManager

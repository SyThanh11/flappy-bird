import { random } from '../helper/helper'
import Transform from '../physics/Transform'
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

class GameManager {
    private gameState: string
    private listOfGrounds: GroundManager
    private listOfBackgrounds: BackgroundManager
    private listOfPipes: PipeManager
    private bird: Bird
    private message: Message
    private score: Score
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
    public setView(view: CanvasView): void {
        this.view = view
    }

    public init = (): void => {
        this.gameState = 'start'
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
    }

    // logic
    public collide(): boolean {
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
        if(this.listOfPipes.getIsDestroyed()){
            this.score.setIsScore(true);
        }

        if( this.score.getIsScore() &&
            this.bird.getCanvasPosition().getX() > this.listOfPipes.getListOfGameObjects()[0].getCanvasPosition().getX() + this.listOfPipes.getListOfGameObjects()[0].getWidth() 
        ){
            this.score.setScore(this.score.getScore() + 1);
            this.score.setIsScore(false);
            this.listOfPipes.setIsDestroyed(false);
        }

        if(this.gameState == 'over'){
            this.score.setIsScore(false);
            this.listOfPipes.setIsDestroyed(false);
            localStorage.setItem('SCORE', String(this.score.getScore()));
        }
    }

    public updateHighScore(): void {
        if(localStorage.getItem('HIGHSCORE')){
            let score = localStorage.getItem('SCORE');
            let highScore = localStorage.getItem('HIGHSCORE');
            if(Number(score) > Number(highScore)){
                localStorage.setItem('HIGHSCORE', String(score));
            }
        } else {
            localStorage.setItem('HIGHSCORE', String(this.score.getScore()));
        }
    }

    public update(): void {
        this.increaseScore();
        this.updateHighScore();
        if (this.collide()) {
            this.gameState = 'over';
            // this.bird.setSpeed(0);
            this.bird.setJumpSpeed(0);
        }
    }
}

export default GameManager

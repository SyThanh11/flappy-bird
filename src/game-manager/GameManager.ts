import { random } from '../helper/helper'
import Bird from '../play/Bird'
// import Message from '../sprites/message/Message'
// import Score from '../sprites/Score'
import Vector2D from '../engine/components/Vector2D'
import Background from '../play/background/Background'
// import BackgroundManager from '../sprites/background/BackgroundManager'
// import Ground from '../sprites/ground/Ground'
// import GroundManager from '../sprites/ground/GroundManager'
// import Pipe from '../sprites/obstacles/Pipe'
// import PipeManager from '../sprites/obstacles/PipeManager'
import CanvasView from '../engine/view/CanvasView'
// import GameOverMessage from '../sprites/message/GameOverMessage'
// import Board from '../sprites/record/Board'
// import Button from '../button/Button'
import { listOfInputs } from '../constant/input'
import Transform from '../engine/components/Transform'
import Engine from '../engine/Engine'
import Scene from '../engine/Scene'
import Ground from '../play/ground/Ground'
import GroundManager from '../play/ground/GroundManager'
import BackgroundManager from '../play/background/BackgroundManager'
import Pipe from '../play/obstacles/Pipe'
import PipeManager from '../play/obstacles/PipeManager'

class GameManager {
    private view: CanvasView
    private engine: Engine
    private scene: Scene

    private bird: Bird
    private listOfGrounds: GroundManager
    private listOfBackgrounds: BackgroundManager
    private listOfPipes: PipeManager

    // private gameState: string

    // private listOfBackgrounds: Background
    // private listOfPipes: PipeManager
    // private message: Message
    // private score: Score
    // private gameOverMessage: GameOverMessage
    // private board: Board
    // private button: Button

    public getView(): CanvasView {
        return this.view
    }

    public init = (): void => {
        this.view = new CanvasView('canvas')
        this.engine = new Engine()
        this.scene = new Scene()

        this.bird = new Bird(
            listOfInputs.birdInfo.path,
            listOfInputs.birdInfo.position,
            listOfInputs.birdInfo.width,
            listOfInputs.birdInfo.height,
            new Transform(
                new Vector2D(
                    this.view.getCanvas().width / 4,
                    (this.view.getCanvas().height - listOfInputs.birdInfo.height) / 2
                )
            ),
            listOfInputs.birdInfo.canvasWidth,
            listOfInputs.birdInfo.canvasHeight,
            listOfInputs.birdInfo.speed,
            listOfInputs.birdInfo.jumpSpeed
        )

        this.listOfGrounds = new GroundManager(
            listOfInputs.listOfGroundsInfo.numberOfGrounds,
            new Ground(
                listOfInputs.listOfGroundsInfo.groundInfo.path,
                listOfInputs.listOfGroundsInfo.groundInfo.position,
                listOfInputs.listOfGroundsInfo.groundInfo.width,
                listOfInputs.listOfGroundsInfo.groundInfo.height,
                listOfInputs.listOfGroundsInfo.groundInfo.canvasPosition,
                listOfInputs.listOfGroundsInfo.groundInfo.canvasWidth,
                listOfInputs.listOfGroundsInfo.groundInfo.canvasHeight
            ),
            listOfInputs.listOfGroundsInfo.indexStart,
            Ground,
            new Vector2D(listOfInputs.listOfGroundsInfo.groundInfo.canvasWidth, listOfInputs.listOfGroundsInfo.groundInfo.canvasPosition.getPosition().getY())
        )
        this.listOfGrounds.setAllSpeed(200)

        this.listOfBackgrounds = new BackgroundManager(
            listOfInputs.listOfBackgroundsInfo.numberOfBackgrounds,
            new Background(
                listOfInputs.listOfBackgroundsInfo.backgroundInfo.path,
                new Transform(
                    new Vector2D(
                        listOfInputs.listOfBackgroundsInfo.backgroundInfo.position.getX(),
                        listOfInputs.listOfBackgroundsInfo.backgroundInfo.position.getY()
                    )
                ),
                listOfInputs.listOfBackgroundsInfo.backgroundInfo.width,
                listOfInputs.listOfBackgroundsInfo.backgroundInfo.height,
                new Transform(
                    new Vector2D(
                        listOfInputs.listOfBackgroundsInfo.backgroundInfo.canvasPosition.getX(),
                        listOfInputs.listOfBackgroundsInfo.backgroundInfo.canvasPosition.getY()
                    )
                ),
                listOfInputs.listOfBackgroundsInfo.backgroundInfo.canvasWidth,
                listOfInputs.listOfBackgroundsInfo.backgroundInfo.canvasHeight
            ),
            listOfInputs.listOfBackgroundsInfo.indexStart,
            Background,
            new Vector2D(listOfInputs.listOfBackgroundsInfo.backgroundInfo.canvasWidth, listOfInputs.listOfBackgroundsInfo.backgroundInfo.canvasPosition.getY())
        ) 

        this.listOfPipes = new PipeManager(
            listOfInputs.listOfPipesInfo.numberOfPipes,
            new Pipe(
                listOfInputs.listOfPipesInfo.pipeInfo.path,
                listOfInputs.listOfPipesInfo.pipeInfo.position,
                listOfInputs.listOfPipesInfo.pipeInfo.width,
                listOfInputs.listOfPipesInfo.pipeInfo.height,
                listOfInputs.listOfPipesInfo.pipeInfo.canvasPosition,
                listOfInputs.listOfPipesInfo.pipeInfo.canvasWidth,
                listOfInputs.listOfPipesInfo.pipeInfo.canvasHeight,
            ),
            listOfInputs.listOfPipesInfo.indexStart,
            Pipe,
            listOfInputs.listOfPipesInfo.pipeInfo.canvasPosition.getPosition()
        )
       
        this.listOfPipes.setAllSpeed(listOfInputs.listOfPipesInfo.pipeInfo.speed);
        
        // set layer
        this.bird.setLayer(2);
        this.listOfGrounds.setAllLayer(2);
        this.listOfBackgrounds.setAllLayer(0);
        this.listOfPipes.setAllLayer(1);
        
        this.scene.addListOfGameObjects(this.listOfGrounds.getListOfGameObjects())
        this.scene.addGameObject(this.bird)
        
        this.scene.addListOfGameObjects(this.listOfBackgrounds.getListOfGameObjects())
        this.scene.addListOfGameObjects(this.listOfPipes.getListOfGameObjects())
        
        this.engine.addScene(this.scene)

    
        
        // this.listOfPipes.create(
        //     listOfInputs.listOfPipesInfo.numberOfPipes,
        //     new Pipe(
        //         listOfInputs.listOfPipesInfo.pipeInfo.path,
        //         listOfInputs.listOfPipesInfo.pipeInfo.position,
        //         listOfInputs.listOfPipesInfo.pipeInfo.width,
        //         listOfInputs.listOfPipesInfo.pipeInfo.height,
        //         listOfInputs.listOfPipesInfo.pipeInfo.canvasPosition,
        //         listOfInputs.listOfPipesInfo.pipeInfo.canvasWidth,
        //         listOfInputs.listOfPipesInfo.pipeInfo.canvasHeight,
        //         listOfInputs.listOfPipesInfo.pipeInfo.speed,
        //         listOfInputs.listOfPipesInfo.pipeInfo.space
        //     )
        // )
        // this.bird = new Bird(
        //     listOfInputs.birdInfo.path,
        //     listOfInputs.birdInfo.position,
        //     listOfInputs.birdInfo.width,
        //     listOfInputs.birdInfo.height,
        //     new Transform(new Vector2D(
        //         this.view.getCanvas().width / 4,
        //         (this.view.getCanvas().height - listOfInputs.birdInfo.height) / 2
        //     )),
        //     listOfInputs.birdInfo.canvasWidth,
        //     listOfInputs.birdInfo.canvasHeight,
        //     listOfInputs.birdInfo.speed,
        //     listOfInputs.birdInfo.jumpSpeed
        // )
        // this.message = new Message(
        //     listOfInputs.messageInfo.path,
        //     listOfInputs.messageInfo.position,
        //     listOfInputs.messageInfo.width,
        //     listOfInputs.messageInfo.height,
        //     new Vector2D(
        //         (this.view.getCanvas().width - listOfInputs.messageInfo.canvasWidth) / 2,
        //         (this.view.getCanvas().height -
        //             listOfInputs.messageInfo.canvasHeight -
        //             listOfInputs.messageInfo.dY) /
        //             2
        //     ),
        //     listOfInputs.messageInfo.canvasWidth,
        //     listOfInputs.messageInfo.canvasHeight,
        //     listOfInputs.messageInfo.speed
        // )
        // this.score = new Score()
        // this.gameOverMessage = new GameOverMessage(
        //     listOfInputs.gameOverMessageInfo.path,
        //     listOfInputs.gameOverMessageInfo.position,
        //     listOfInputs.gameOverMessageInfo.width,
        //     listOfInputs.gameOverMessageInfo.height,
        //     new Vector2D(
        //         (this.view.getCanvas().width - listOfInputs.gameOverMessageInfo.canvasWidth) / 2,
        //         listOfInputs.gameOverMessageInfo.canvasHeight + listOfInputs.gameOverMessageInfo.dY
        //     ),
        //     listOfInputs.gameOverMessageInfo.canvasWidth,
        //     listOfInputs.gameOverMessageInfo.canvasHeight,
        //     listOfInputs.gameOverMessageInfo.speed
        // )
        // this.board = new Board(
        //     listOfInputs.boardInfo.path,
        //     listOfInputs.boardInfo.position,
        //     listOfInputs.boardInfo.width,
        //     listOfInputs.boardInfo.height,
        //     new Vector2D(
        //         (this.view.getCanvas().width - listOfInputs.boardInfo.canvasWidth) / 2,
        //         listOfInputs.boardInfo.canvasHeight + listOfInputs.boardInfo.dY
        //     ),
        //     listOfInputs.boardInfo.canvasWidth,
        //     listOfInputs.boardInfo.canvasHeight,
        //     listOfInputs.boardInfo.speed
        // )
        // this.button = new Button(
        //     listOfInputs.buttonInfo.path,
        //     listOfInputs.buttonInfo.position,
        //     listOfInputs.buttonInfo.width,
        //     listOfInputs.buttonInfo.height,
        //     new Vector2D(
        //         (this.view.getCanvas().width - listOfInputs.buttonInfo.canvasWidth) / 2,
        //         (this.view.getCanvas().height +
        //             listOfInputs.buttonInfo.canvasHeight +
        //             listOfInputs.buttonInfo.dY) /
        //             2
        //     ),
        //     listOfInputs.buttonInfo.canvasWidth,
        //     listOfInputs.buttonInfo.canvasHeight,
        //     listOfInputs.buttonInfo.speed
        // )
    }

    // handleInputEvent
    public handleInputEvent = (): void => {}

    // draw
    public draw(): void {
        this.view.clear()
        this.engine.draw()
    }

    // update
    public update(deltaTime: number): void {
        if (this.checkCollision()) {
            this.bird.destroy()
            this.listOfGrounds.destroy()
        } else {
            this.engine.update(deltaTime);
            this.listOfGrounds.update(deltaTime, this.scene)
            this.listOfPipes.update(deltaTime, this.scene)
        }

        // if (this.gameState === 'play') {
        //     this.bird.setIsJumping(false)
        //     this.listOfGrounds.update(deltaTime)
        //     this.listOfPipes.update(
        //         deltaTime,
        //         this.view.getCanvas(),
        //         random(400, 420),
        //         random(-200, -100),
        //         random(60, 80)
        //     )
        //     this.increaseScore()
        //     if (this.isCollide()) {
        //         this.gameState = 'over'
        //         // this.bird.setSpeed(0);
        //         this.bird.setJumpSpeed(0)
        //     }
        // } else if (this.gameState == 'over') {
        //     this.bird.update(deltaTime, this.gameState, this.view)
        //     this.updateHighScore()
        // }
    }

    // logic
    private checkCollision(): boolean {
        const { listOfGameObjects } = this.scene;
    
        for (let i = 0; i < listOfGameObjects.length - 1; i++) {
            const obj1 = listOfGameObjects[i];
    
            for (let j = i + 1; j < listOfGameObjects.length; j++) {
                const obj2 = listOfGameObjects[j];
    
                // Check collision between Bird and Ground
                if (obj1 instanceof Bird && obj2 instanceof Ground) {
                    if (obj1.collider.isColliding(obj2.collider)) return true;
                } else if (obj1 instanceof Ground && obj2 instanceof Bird) {
                    if (obj1.collider.isColliding(obj2.collider)) return true;
                }
    
                // Check collision between Bird and Pipe
                if (obj1 instanceof Bird && obj2 instanceof Pipe) {
                    if (obj1.collider.isColliding(obj2.collider)) return true;
                } else if (obj1 instanceof Pipe && obj2 instanceof Bird) {
                    if (obj1.collider.isColliding(obj2.collider)) return true;
                }
            }
        }
    
        return false; // No collisions found
    }

    // public increaseScore(): void {
    //     if (this.listOfPipes.getIsDestroyed()) {
    //         this.score.setIsScore(true)
    //     }

    //     if (
    //         this.score.getIsScore() &&
    //         this.bird.getCanvasPosition().getX() >
    //             this.listOfPipes.getListOfGameObjects()[0].getCanvasPosition().getX() +
    //                 this.listOfPipes.getListOfGameObjects()[0].getWidth()
    //     ) {
    //         this.score.setScore(this.score.getScore() + 1)
    //         this.score.setIsScore(false)
    //         this.listOfPipes.setIsDestroyed(false)
    //     }
    // }

    // public updateHighScore(): void {
    //     this.score.setIsScore(false)
    //     this.listOfPipes.setIsDestroyed(false)
    //     localStorage.setItem('SCORE', String(this.score.getScore()))
    //     if (localStorage.getItem('HIGHSCORE')) {
    //         let score = localStorage.getItem('SCORE')
    //         let highScore = localStorage.getItem('HIGHSCORE')
    //         if (Number(score) > Number(highScore)) {
    //             localStorage.setItem('HIGHSCORE', String(score))
    //         }
    //     } else {
    //         localStorage.setItem('HIGHSCORE', String(this.score.getScore()))
    //     }
    //     this.score.setBestScore(Number(localStorage.getItem('HIGHSCORE')))
    // }
}

export default GameManager

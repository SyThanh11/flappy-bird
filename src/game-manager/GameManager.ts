import CanvasView from '../engine/view/CanvasView'
import { gameState, listOfInputs } from '../constant/input'
import Engine from '../engine/Engine'
import Scene from '../engine/Scene'
import Ground from '../play/ground/Ground'
import Pipe from '../play/obstacles/Pipe'
import MouseEventHandler from '../engine/controller/MouseEventHandler'
import Score from '../play/Score'
import Bird from '../play/Bird/Bird'
import BirdBuilder from '../play/Bird/BirdBuilder'
import BackgroundManagerBuilder from '../play/background/BackgroundManagerBuilder'
import ButtonBuilder from '../play/button/ButtonBuilder'
import MessageBuilder from '../play/message/MessageBuilder'
import GameOverMessageBuilder from '../play/message/GameOverMessageBuilder'
import GroundManagerBuilder from '../play/ground/GroundManagerBuilder'
import BoardBuilder from '../play/record/BoardBuilder'
import PipeManagerBuilder from '../play/obstacles/PipeManagerBuilder'

class GameManager {
    private view: CanvasView
    private engine: Engine
    private scene: Scene
    private mouseEvent: MouseEventHandler = new MouseEventHandler('canvas')

    private gameState: string
    private birdBuilder: BirdBuilder
    private listOfGroundsBuilder: GroundManagerBuilder
    private listOfBackgroundsBuilder: BackgroundManagerBuilder
    private listOfPipesBuilder: PipeManagerBuilder
    private messageBuilder: MessageBuilder
    private gameOverMessageBuilder: GameOverMessageBuilder
    private boardBuilder: BoardBuilder
    private buttonBuilder: ButtonBuilder
    private score: Score

    public init = (): void => {
        this.view = new CanvasView('canvas')
        this.engine = new Engine()
        this.scene = new Scene()
        this.gameState = gameState.START

        this.birdBuilder = new BirdBuilder(this.view);
        this.listOfBackgroundsBuilder = new BackgroundManagerBuilder();
        this.buttonBuilder = new ButtonBuilder(this.view);
        this.messageBuilder = new MessageBuilder(this.view);
        this.gameOverMessageBuilder = new GameOverMessageBuilder(this.view);
        this.listOfGroundsBuilder = new GroundManagerBuilder();
        this.boardBuilder = new BoardBuilder(this.view);
        this.listOfPipesBuilder = new PipeManagerBuilder();

        this.birdBuilder.addToScene(this.scene);
        this.listOfBackgroundsBuilder.addToScene(this.scene);
        this.buttonBuilder.addToScene(this.scene);
        this.messageBuilder.addToScene(this.scene);
        this.gameOverMessageBuilder.addToScene(this.scene);
        this.listOfGroundsBuilder.addToScene(this.scene);
        this.boardBuilder.addToScene(this.scene);
        this.listOfPipesBuilder.addToScene(this.scene);
        
        this.createScore()
        
        this.birdBuilder.build().setLayer(2)
        this.listOfBackgroundsBuilder.build().setAllLayer(0)
        this.buttonBuilder.build().setLayer(-2)
        this.messageBuilder.build().setLayer(-2)
        this.gameOverMessageBuilder.build().setLayer(-2)
        this.listOfGroundsBuilder.build().setAllLayer(2)
        this.boardBuilder.build().setLayer(-2)
        this.listOfPipesBuilder.build().setAllLayer(-1)
        
        this.engine.setCurrentScene(this.scene)
        this.engine.addScene(this.scene)
    }

    public createScore(): void {
        this.score = new Score()
    }

    // handleInputEvent
    public handleInputEvent = (): void => {}

    // draw
    public draw(): void {
        this.view.clear()
        this.engine.draw()
        this.score.draw(this.view.getCtx(), this.view.getCanvas(), this.gameState)
    }

    // update
    public update(deltaTime: number): void {
        const isMousePressed = this.mouseEvent.isMousePressed()
        switch (this.gameState) {
            case gameState.START:
                this.messageBuilder.build().setLayer(2)
                this.listOfGroundsBuilder.build().setAllSpeed(0)
                this.listOfPipesBuilder.build().setAllSpeed(0)
                this.engine.update(deltaTime)
                if (isMousePressed) {
                    this.scene.removeGameObject(this.messageBuilder.build())
                    this.gameState = gameState.PLAYING
                    this.birdBuilder.build().setGameState(this.gameState)
                }
                break
            case gameState.PLAYING:
                this.messageBuilder.build().setLayer(-2)
                this.listOfPipesBuilder.build().setAllLayer(1)
                this.listOfGroundsBuilder.build().setAllSpeed(listOfInputs.listOfGroundsInfo.groundInfo.speed)
                this.listOfPipesBuilder.build().setAllSpeed(listOfInputs.listOfPipesInfo.pipeInfo.speed)

                if (this.checkCollision()) {
                    this.gameState = gameState.GAMEOVER
                } else {
                    this.engine.update(deltaTime)
                    this.listOfGroundsBuilder.build().update(deltaTime, this.scene)
                    this.listOfPipesBuilder.build().update(deltaTime, this.scene)
                    this.caculateScore()
                }
                if (isMousePressed) {
                }
                break
            case gameState.GAMEOVER:
                this.gameOverMessageBuilder.build().setLayer(5)
                this.boardBuilder.build().setLayer(5)
                this.buttonBuilder.build().setLayer(5)

                if (isMousePressed && this.buttonBuilder.build().getIsClicked()) {
                    this.gameState = gameState.PLAYING
                    this.birdBuilder.build().setGameState(this.gameState)
                    this.init()
                    this.buttonBuilder.build().setIsClicked(false)
                }
                break
            default:
                break
        }
    }

    // logic
    private checkCollision(): boolean {
        const { listOfGameObjects } = this.scene

        for (let i = 0; i < listOfGameObjects.length - 1; i++) {
            const obj1 = listOfGameObjects[i]

            for (let j = i + 1; j < listOfGameObjects.length; j++) {
                const obj2 = listOfGameObjects[j]

                // Check collision between Bird and Ground
                if (obj1 instanceof Bird && obj2 instanceof Ground) {
                    if (obj1.collider.isColliding(obj2.collider)) return true
                } else if (obj1 instanceof Ground && obj2 instanceof Bird) {
                    if (obj1.collider.isColliding(obj2.collider)) return true
                }

                // Check collision between Bird and Pipe
                if (obj1 instanceof Bird && obj2 instanceof Pipe) {
                    if (obj1.collider.isColliding(obj2.collider)) return true
                } else if (obj1 instanceof Pipe && obj2 instanceof Bird) {
                    if (obj1.collider.isColliding(obj2.collider)) return true
                }
            }
        }

        return false
    }

    // caculate score
    private caculateScore(): void {
        if (this.listOfPipesBuilder.build().getIsDestroyed()) {
            this.score.setIsScore(true)
        }

        const firstGroundObject =
            this.scene.listOfGameObjects[this.listOfPipesBuilder.build().findFirstPipes(this.scene)]

        if (
            this.score.getIsScore() &&
            this.birdBuilder.build().getCanvasPosition().getX() >
                firstGroundObject.getCanvasPosition().getX() + firstGroundObject.getCanvasWidth()
        ) {
            this.score.setScore(this.score.getScore() + 1)
            this.score.setIsScore(false)
            this.listOfPipesBuilder.build().setIsDestroyed(false)
        }
    }
}

export default GameManager

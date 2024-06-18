import Bird from '../play/Bird'
import Vector2D from '../engine/components/Vector2D'
import Background from '../play/background/Background'
import CanvasView from '../engine/view/CanvasView'
import { gameState, listOfInputs } from '../constant/input'
import Transform from '../engine/components/Transform'
import Engine from '../engine/Engine'
import Scene from '../engine/Scene'
import Ground from '../play/ground/Ground'
import GroundManager from '../play/ground/GroundManager'
import BackgroundManager from '../play/background/BackgroundManager'
import Pipe from '../play/obstacles/Pipe'
import PipeManager from '../play/obstacles/PipeManager'
import Message from '../play/message/Message'
import GameOverMessage from '../play/message/GameOverMessage'
import MouseEventHandler from '../engine/controller/MouseEventHandler'
import Board from '../play/record/Board'
import Button from '../play/button/Button'
import Score from '../play/Score'

class GameManager {
    private view: CanvasView
    private engine: Engine
    private scene: Scene
    private mouseEvent: MouseEventHandler = new MouseEventHandler('canvas')

    private gameState: string
    private bird: Bird
    private listOfGrounds: GroundManager
    private listOfBackgrounds: BackgroundManager
    private listOfPipes: PipeManager
    private message: Message
    private gameOverMessage: GameOverMessage
    private board: Board
    private button: Button
    private score: Score

    public getView(): CanvasView {
        return this.view
    }

    public init = (): void => {
        this.view = new CanvasView('canvas')
        this.engine = new Engine()
        this.scene = new Scene()
        this.gameState = gameState.START

        this.createBird()
        this.createListOfGrounds()
        this.createListOfBackgrounds()
        this.createListOfPipes()
        this.createMessage()
        this.createGameOverMessage()
        this.createBoard()
        this.createButton()
        this.createScore()

        this.scene.addListOfGameObjects(this.listOfGrounds.getListOfGameObjects())
        this.scene.addGameObject(this.bird)
        this.scene.addListOfGameObjects(this.listOfBackgrounds.getListOfGameObjects())
        this.scene.addListOfGameObjects(this.listOfPipes.getListOfGameObjects())
        this.scene.addGameObject(this.message)
        this.scene.addGameObject(this.gameOverMessage)
        this.scene.addGameObject(this.board)
        this.scene.addGameObject(this.button)

        this.bird.setLayer(2)
        this.listOfGrounds.setAllLayer(2)
        this.listOfBackgrounds.setAllLayer(0)
        this.listOfPipes.setAllLayer(-1)
        this.message.setLayer(-2)
        this.gameOverMessage.setLayer(-2)
        this.board.setLayer(-2)
        this.button.setLayer(-2)

        this.engine.setCurrentScene(this.scene)
        this.engine.addScene(this.scene)
    }

    public createBird(): void {
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
    }

    public createListOfGrounds(): void {
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
            new Vector2D(
                listOfInputs.listOfGroundsInfo.groundInfo.canvasWidth,
                listOfInputs.listOfGroundsInfo.groundInfo.canvasPosition.getPosition().getY()
            )
        )
        this.listOfGrounds.setAllSpeed(listOfInputs.listOfGroundsInfo.groundInfo.speed)
    }

    public createListOfBackgrounds(): void {
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
            new Vector2D(
                listOfInputs.listOfBackgroundsInfo.backgroundInfo.canvasWidth,
                listOfInputs.listOfBackgroundsInfo.backgroundInfo.canvasPosition.getY()
            )
        )
    }

    public createListOfPipes(): void {
        this.listOfPipes = new PipeManager(
            listOfInputs.listOfPipesInfo.numberOfPipes,
            new Pipe(
                listOfInputs.listOfPipesInfo.pipeInfo.pathDown,
                listOfInputs.listOfPipesInfo.pipeInfo.position,
                listOfInputs.listOfPipesInfo.pipeInfo.width,
                listOfInputs.listOfPipesInfo.pipeInfo.height,
                listOfInputs.listOfPipesInfo.pipeInfo.canvasPosition,
                listOfInputs.listOfPipesInfo.pipeInfo.canvasWidth,
                listOfInputs.listOfPipesInfo.pipeInfo.canvasHeight
            ),
            listOfInputs.listOfPipesInfo.indexStart,
            Pipe,
            listOfInputs.listOfPipesInfo.pipeInfo.canvasPosition.getPosition(),
            listOfInputs.listOfPipesInfo.pipeInfo.space,
            listOfInputs.listOfPipesInfo.pipeInfo.pathUp
        )
        this.listOfPipes.setAllSpeed(listOfInputs.listOfPipesInfo.pipeInfo.speed)
    }

    public createMessage(): void {
        this.message = new Message(
            listOfInputs.messageInfo.path,
            listOfInputs.messageInfo.position,
            listOfInputs.messageInfo.width,
            listOfInputs.messageInfo.height,
            new Transform(
                new Vector2D(
                    (this.view.getCanvas().width - listOfInputs.messageInfo.canvasWidth) / 2,
                    (this.view.getCanvas().height -
                        listOfInputs.messageInfo.canvasHeight -
                        listOfInputs.messageInfo.dY) /
                        2
                )
            ),
            listOfInputs.messageInfo.canvasWidth,
            listOfInputs.messageInfo.canvasHeight
        )
    }

    public createGameOverMessage(): void {
        this.gameOverMessage = new GameOverMessage(
            listOfInputs.gameOverMessageInfo.path,
            listOfInputs.gameOverMessageInfo.position,
            listOfInputs.gameOverMessageInfo.width,
            listOfInputs.gameOverMessageInfo.height,
            new Transform(
                new Vector2D(
                    (this.view.getCanvas().width - listOfInputs.gameOverMessageInfo.canvasWidth) /
                        2,
                    listOfInputs.gameOverMessageInfo.canvasHeight +
                        listOfInputs.gameOverMessageInfo.dY
                )
            ),
            listOfInputs.gameOverMessageInfo.canvasWidth,
            listOfInputs.gameOverMessageInfo.canvasHeight
        )
    }

    public createBoard(): void {
        this.board = new Board(
            listOfInputs.boardInfo.path,
            listOfInputs.boardInfo.position,
            listOfInputs.boardInfo.width,
            listOfInputs.boardInfo.height,
            new Transform(
                new Vector2D(
                    (this.view.getCanvas().width - listOfInputs.boardInfo.canvasWidth) / 2,
                    listOfInputs.boardInfo.canvasHeight + listOfInputs.boardInfo.dY
                )
            ),
            listOfInputs.boardInfo.canvasWidth,
            listOfInputs.boardInfo.canvasHeight
        )
    }

    public createButton(): void {
        this.button = new Button(
            listOfInputs.buttonInfo.path,
            listOfInputs.buttonInfo.position,
            listOfInputs.buttonInfo.width,
            listOfInputs.buttonInfo.height,
            new Transform(
                new Vector2D(
                    (this.view.getCanvas().width - listOfInputs.buttonInfo.canvasWidth) / 2,
                    (this.view.getCanvas().height +
                        listOfInputs.buttonInfo.canvasHeight +
                        listOfInputs.buttonInfo.dY) /
                        2
                )
            ),
            listOfInputs.buttonInfo.canvasWidth,
            listOfInputs.buttonInfo.canvasHeight
        )

        this.mouseEvent.addObserver(this.button);
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
                this.message.setLayer(2)
                this.listOfGrounds.setAllSpeed(0)
                this.listOfPipes.setAllSpeed(0)
                this.engine.update(deltaTime)
                if (isMousePressed) {
                    this.scene.removeGameObject(this.message)
                    this.gameState = gameState.PLAYING
                    this.bird.setGameState(this.gameState)
                }
                break
            case gameState.PLAYING:
                this.message.setLayer(-2)
                this.listOfPipes.setAllLayer(1)
                this.listOfGrounds.setAllSpeed(listOfInputs.listOfGroundsInfo.groundInfo.speed)
                this.listOfPipes.setAllSpeed(listOfInputs.listOfPipesInfo.pipeInfo.speed)

                if (this.checkCollision()) {
                    this.gameState = gameState.GAMEOVER
                } else {
                    this.engine.update(deltaTime)
                    this.listOfGrounds.update(deltaTime, this.scene)
                    this.listOfPipes.update(deltaTime, this.scene)
                    this.caculateScore()
                }
                if (isMousePressed) {
                }
                break
            case gameState.GAMEOVER:
                this.gameOverMessage.setLayer(5)
                this.board.setLayer(5)
                this.button.setLayer(5)

                if (isMousePressed && this.button.getIsClicked()) {
                    this.gameState = gameState.PLAYING
                    this.bird.setGameState(this.gameState)
                    this.init()
                    this.button.setIsClicked(false)
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
        if (this.listOfPipes.getIsDestroyed()) {
            this.score.setIsScore(true)
        }

        const firstGroundObject =
            this.scene.listOfGameObjects[this.listOfPipes.findFirstPipes(this.scene)]

        if (
            this.score.getIsScore() &&
            this.bird.getCanvasPosition().getX() >
                firstGroundObject.getCanvasPosition().getX() + firstGroundObject.getCanvasWidth()
        ) {
            this.score.setScore(this.score.getScore() + 1)
            this.score.setIsScore(false)
            this.listOfPipes.setIsDestroyed(false)
        }
    }
}

export default GameManager

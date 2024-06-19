import CanvasView from '../../engine/view/CanvasView'
import Engine from '../../engine/Engine'
import Scene from '../../engine/Scene'
import MouseEventHandler from '../../engine/controller/MouseEventHandler'
import Score from '../Score'
import BirdBuilder from '../Bird/BirdBuilder'
import BackgroundManagerBuilder from '../background/BackgroundManagerBuilder'
import ButtonBuilder from '../button/ButtonBuilder'
import MessageBuilder from '../message/MessageBuilder'
import GameOverMessageBuilder from '../message/GameOverMessageBuilder'
import GroundManagerBuilder from '../ground/GroundManagerBuilder'
import BoardBuilder from '../record/BoardBuilder'
import PipeManagerBuilder from '../obstacles/PipeManagerBuilder'
import GameState from '../../constant/GameState'
import StartState from '../../pattern/state/StartState'
import PlayingState from '../../pattern/state/PlayingState'
import GameOverState from '../../pattern/state/GameOverState'
import MiddleGameObject from './MiddleGameObject'
import Transform from '../../engine/components/Transform'

class GameManager {
    private view: CanvasView = new CanvasView('canvas')
    private engine: Engine = Engine.getInstance(this.view.getCtx(), this.view.getCanvas());
    private scene: Scene
    private mouseEvent: MouseEventHandler = new MouseEventHandler('canvas')
    private currentState: State;

    private birdBuilder: BirdBuilder
    private listOfGroundsBuilder: GroundManagerBuilder
    private listOfBackgroundsBuilder: BackgroundManagerBuilder
    private listOfPipesBuilder: PipeManagerBuilder
    private messageBuilder: MessageBuilder
    private gameOverMessageBuilder: GameOverMessageBuilder
    private boardBuilder: BoardBuilder
    private buttonBuilder: ButtonBuilder
    private middleGameObject: MiddleGameObject

    private score: Score

    constructor(){
        this.scene = new Scene()
        this.init();
    }

    public init = (): void => {
        // this.scene = new Scene()

        this.birdBuilder = new BirdBuilder(this.view);
        this.listOfBackgroundsBuilder = new BackgroundManagerBuilder();
        this.buttonBuilder = new ButtonBuilder(this.view);
        this.messageBuilder = new MessageBuilder(this.view);
        this.gameOverMessageBuilder = new GameOverMessageBuilder(this.view);
        this.listOfGroundsBuilder = new GroundManagerBuilder();
        this.boardBuilder = new BoardBuilder(this.view);
        this.listOfPipesBuilder = new PipeManagerBuilder();

        this.middleGameObject = new MiddleGameObject('', new Transform(), 0, 0, new Transform(), 0, 0)
        this.middleGameObject.setGameManager(this)

        this.birdBuilder.addToScene(this.scene);
        this.listOfBackgroundsBuilder.addToScene(this.scene);
        this.buttonBuilder.addToScene(this.scene);
        this.messageBuilder.addToScene(this.scene);
        this.gameOverMessageBuilder.addToScene(this.scene);
        this.listOfGroundsBuilder.addToScene(this.scene);
        this.boardBuilder.addToScene(this.scene);
        this.listOfPipesBuilder.addToScene(this.scene);
        this.middleGameObject.addToScene(this.scene);
        
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

        this.currentState = new StartState(this);
    }

    public createScore(): void {
        this.score = new Score()
    }

    public setGameState(state: GameState): void {
        switch (state) {
            case GameState.START:
                this.currentState = new StartState(this);
                break;
            case GameState.PLAYING:
                this.currentState = new PlayingState(this);
                break;
            case GameState.GAMEOVER:
                this.currentState = new GameOverState(this);
                break;
            default:
                break;
        }
    }

    // update
    public update(deltaTime: number): void {
        this.currentState.update(deltaTime)
    }

    // caculate score
    // private caculateScore(): void {
    //     if (this.listOfPipesBuilder.build().getIsDestroyed()) {
    //         this.score.setIsScore(true)
    //     }

    //     const firstGroundObject =
    //         this.scene.listOfGameObjects[this.listOfPipesBuilder.build().findFirstPipes(this.scene)]

    //     if (
    //         this.score.getIsScore() &&
    //         this.birdBuilder.build().getCanvasPosition().getX() >
    //             firstGroundObject.getCanvasPosition().getX() + firstGroundObject.getCanvasWidth()
    //     ) {
    //         this.score.setScore(this.score.getScore() + 1)
    //         this.score.setIsScore(false)
    //         this.listOfPipesBuilder.build().setIsDestroyed(false)
    //     }
    // }

    public getScene(): Scene {
        return this.scene;
    }

    public getMouseEventHandler(): MouseEventHandler {
        return this.mouseEvent;
    }

    public getCanvasView(): CanvasView {
        return this.view;
    }

    public getEngine(): Engine {
        return this.engine;
    }

    public getBirdBuilder(): BirdBuilder {
        return this.birdBuilder
    }

    public getListOfBackgroundsBuilder(): BackgroundManagerBuilder {
        return this.listOfBackgroundsBuilder
    }

    public getButtonBuilder(): ButtonBuilder {
        return this.buttonBuilder
    }

    public getMessageBuilder(): MessageBuilder {
        return this.messageBuilder
    }

    public getGameOverMessageBuilder(): GameOverMessageBuilder {
        return this.gameOverMessageBuilder
    }

    public getListOfGroundsBuilder(): GroundManagerBuilder {
        return this.listOfGroundsBuilder
    }

    public getBoardBuilder(): BoardBuilder {
        return this.boardBuilder
    }

    public getListOfPipesBuilder(): PipeManagerBuilder {
        return this.listOfPipesBuilder
    }
}

export default GameManager

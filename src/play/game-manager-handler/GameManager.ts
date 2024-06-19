import CanvasView from '../../engine/view/CanvasView'
import Engine from '../../engine/Engine'
import MouseEventHandler from '../../engine/controller/MouseEventHandler'
import BirdBuilder from '../Bird/BirdBuilder'
import BackgroundManagerBuilder from '../background/BackgroundManagerBuilder'
import ButtonBuilder from '../button/ButtonBuilder'
import MessageBuilder from '../message/MessageBuilder'
import GameOverMessageBuilder from '../message/GameOverMessageBuilder'
import GroundManagerBuilder from '../ground/GroundManagerBuilder'
import BoardBuilder from '../record/BoardBuilder'
import PipeManagerBuilder from '../obstacles/PipeManagerBuilder'
import MiddleGameObject from './MiddleGameObject'
import Transform from '../../engine/components/Transform'
import Scene from '../../engine/scene/Scene'
import SceneManager from '../../engine/scene/SceneManager'
import StartState from '../pattern/state/StartState'
import GameState from '../constant/GameState'
import PlayingState from '../pattern/state/PlayingState'
import GameOverState from '../pattern/state/GameOverState'
import Score from '../score/Score'
import ScoreBuilder from '../score/ScoreBuilder'

class GameManager {
    private view: CanvasView = new CanvasView('canvas')
    private engine: Engine;
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
    private scoreBuilder: ScoreBuilder;

    constructor(){
        this.engine = new Engine(this.view.getCtx(), this.view.getCanvas())
        this.init();
    }

    public init = (): void => {
        this.scene = new Scene()
        SceneManager.getInstance().addScene('game', this.scene)
        SceneManager.getInstance().setCurrentScene('game')

        this.createObject();
        
        this.currentState = new StartState(this);
    }

    public createObject(){
        // automatically add to the scene
        this.birdBuilder = new BirdBuilder(this.view);
        this.listOfBackgroundsBuilder = new BackgroundManagerBuilder();
        this.buttonBuilder = new ButtonBuilder(this.view);
        this.messageBuilder = new MessageBuilder(this.view);
        this.gameOverMessageBuilder = new GameOverMessageBuilder(this.view);
        this.boardBuilder = new BoardBuilder(this.view);
        this.scoreBuilder = new ScoreBuilder();
        
        // no-auto add to the scene
        this.listOfPipesBuilder = new PipeManagerBuilder();
        this.listOfGroundsBuilder = new GroundManagerBuilder();
        this.middleGameObject = new MiddleGameObject('', new Transform(), 0, 0, new Transform(), 0, 0)
        this.middleGameObject.setGameManager(this)
        this.listOfGroundsBuilder.addToScene(this.scene);
        this.listOfPipesBuilder.addToScene(this.scene);
        this.middleGameObject.addToScene(this.scene);
        
        this.birdBuilder.build().setLayer(2)
        this.listOfBackgroundsBuilder.build().setAllLayer(0)
        this.buttonBuilder.build().setLayer(-2)
        this.messageBuilder.build().setLayer(-2)
        this.gameOverMessageBuilder.build().setLayer(-2)
        this.listOfGroundsBuilder.build().setAllLayer(2)
        this.boardBuilder.build().setLayer(-2)
        this.listOfPipesBuilder.build().setAllLayer(-1)
        this.scoreBuilder.build().setLayer(-2)
    }

    public reload() {
        SceneManager.getInstance().getCurrentScene().deleteScene();
    
        this.createObject();

        this.getBirdBuilder().build().setGameState(GameState.PLAYING)
        this.currentState = new PlayingState(this);
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

    public update(deltaTime: number): void {
        this.currentState.update(deltaTime)
    }    

    public getScene(): Scene {
        return this.scene;
    }

    public getMouseEventHandler(): MouseEventHandler {
        return this.mouseEvent;
    }

    public getCanvasView(): CanvasView {
        return this.view;
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

    public getMiddleGameObject(): MiddleGameObject {
        return this.middleGameObject
    }

    public getScoreBuilder(): ScoreBuilder {
        return this.scoreBuilder
    }
}

export default GameManager

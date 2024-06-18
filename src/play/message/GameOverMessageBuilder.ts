import { listOfInputs } from "../../constant/input";
import Scene from "../../engine/Scene";
import Transform from "../../engine/components/Transform";
import Vector2D from "../../engine/components/Vector2D";
import CanvasView from "../../engine/view/CanvasView";
import ObjectBuilder from "../../pattern/builder/ObjectBuilder";
import GameOverMessage from "./GameOverMessage";

class GameOverMessageBuilder implements ObjectBuilder{
    private gameOverMessage: GameOverMessage;

    constructor(view: CanvasView){
        this.gameOverMessage = new GameOverMessage(
            listOfInputs.gameOverMessageInfo.path,
            listOfInputs.gameOverMessageInfo.position,
            listOfInputs.gameOverMessageInfo.width,
            listOfInputs.gameOverMessageInfo.height,
            new Transform(
                new Vector2D(
                    (view.getCanvas().width - listOfInputs.gameOverMessageInfo.canvasWidth) /
                        2,
                    listOfInputs.gameOverMessageInfo.canvasHeight +
                        listOfInputs.gameOverMessageInfo.dY
                )
            ),
            listOfInputs.gameOverMessageInfo.canvasWidth,
            listOfInputs.gameOverMessageInfo.canvasHeight
        )
    }

    build(): GameOverMessage {
        return this.gameOverMessage;
    }
    
    public addToScene(scene: Scene): void {
        scene.addGameObject(this.gameOverMessage)
    }
}

export default GameOverMessageBuilder;
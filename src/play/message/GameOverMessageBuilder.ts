import Transform from "../../engine/components/Transform";
import Vector2D from "../../engine/components/Vector2D";
import ResourceManager from "../../engine/controller/ResourceManager";
import Scene from "../../engine/scene/Scene";
import listOfInputs from "../constant/input";
import ObjectBuilder from "../pattern/builder/ObjectBuilder";
import GameOverMessage from "./GameOverMessage";

class GameOverMessageBuilder implements ObjectBuilder {
    private gameOverMessage: GameOverMessage;

    constructor(){
        this.gameOverMessage = new GameOverMessage(
            ResourceManager.getInstance().getImage(17),
            listOfInputs.gameOverMessageInfo.position,
            listOfInputs.gameOverMessageInfo.width,
            listOfInputs.gameOverMessageInfo.height,
            new Transform(
                new Vector2D(
                    (800 - listOfInputs.gameOverMessageInfo.canvasWidth) /
                        2,
                    listOfInputs.gameOverMessageInfo.canvasHeight +
                        listOfInputs.gameOverMessageInfo.dY
                )
            ),
            listOfInputs.gameOverMessageInfo.canvasWidth,
            listOfInputs.gameOverMessageInfo.canvasHeight,
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
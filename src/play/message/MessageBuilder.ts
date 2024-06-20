import Transform from "../../engine/components/Transform";
import Vector2D from "../../engine/components/Vector2D";
import ResourceManager from "../../engine/controller/ResourceManager";
import Scene from "../../engine/scene/Scene";
import listOfInputs from "../constant/input";
import ObjectBuilder from "../pattern/builder/ObjectBuilder";
import Message from "./Message";

class MessageBuilder implements ObjectBuilder {
    private message: Message;

    constructor(){
        this.message = new Message(
            ResourceManager.getInstance().getImage(14),
            listOfInputs.messageInfo.position,
            listOfInputs.messageInfo.width,
            listOfInputs.messageInfo.height,
            new Transform(
                new Vector2D(
                    (800- listOfInputs.messageInfo.canvasWidth) / 2,
                    (510 -
                        listOfInputs.messageInfo.canvasHeight -
                        listOfInputs.messageInfo.dY) /
                        2
                )
            ),
            listOfInputs.messageInfo.canvasWidth,
            listOfInputs.messageInfo.canvasHeight,
        )
    }

    public build(): Message {
        return this.message;
    }
    
    public addToScene(scene: Scene): void {
        scene.addGameObject(this.message);
    }
}

export default MessageBuilder;
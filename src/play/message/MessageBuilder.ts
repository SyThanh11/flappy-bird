import { listOfInputs } from "../../constant/input";
import Scene from "../../engine/Scene";
import Transform from "../../engine/components/Transform";
import Vector2D from "../../engine/components/Vector2D";
import GameObject from "../../engine/gameObject/GameObject";
import CanvasView from "../../engine/view/CanvasView";
import ObjectBuilder from "../../pattern/builder/ObjectBuilder";
import Message from "./Message";

class MessageBuilder implements ObjectBuilder {
    private message: Message;

    constructor(view: CanvasView){
        this.message = new Message(
            listOfInputs.messageInfo.path,
            listOfInputs.messageInfo.position,
            listOfInputs.messageInfo.width,
            listOfInputs.messageInfo.height,
            new Transform(
                new Vector2D(
                    (view.getCanvas().width - listOfInputs.messageInfo.canvasWidth) / 2,
                    (view.getCanvas().height -
                        listOfInputs.messageInfo.canvasHeight -
                        listOfInputs.messageInfo.dY) /
                        2
                )
            ),
            listOfInputs.messageInfo.canvasWidth,
            listOfInputs.messageInfo.canvasHeight
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
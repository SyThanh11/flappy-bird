import Transform from "../../engine/components/Transform";
import Vector2D from "../../engine/components/Vector2D";
import Scene from "../../engine/scene/Scene";
import CanvasView from "../../engine/view/CanvasView";
import listOfInputs from "../constant/input";
import ObjectBuilder from "../pattern/builder/ObjectBuilder";
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
            listOfInputs.messageInfo.canvasHeight,
            true
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
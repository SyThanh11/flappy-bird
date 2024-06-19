import Transform from "../../engine/components/Transform";
import Vector2D from "../../engine/components/Vector2D";
import Scene from "../../engine/scene/Scene";
import CanvasView from "../../engine/view/CanvasView";
import listOfInputs from "../constant/input";
import ObjectBuilder from "../pattern/builder/ObjectBuilder";
import Button from "./Button";

class ButtonBuilder implements ObjectBuilder {
    private button: Button;

    constructor(view: CanvasView){
        this.button = new Button(
            listOfInputs.buttonInfo.path,
            listOfInputs.buttonInfo.position,
            listOfInputs.buttonInfo.width,
            listOfInputs.buttonInfo.height,
            new Transform(
                new Vector2D(
                    (view.getCanvas().width - listOfInputs.buttonInfo.canvasWidth) / 2,
                    (view.getCanvas().height +
                        listOfInputs.buttonInfo.canvasHeight +
                        listOfInputs.buttonInfo.dY) /
                        2
                )
            ),
            listOfInputs.buttonInfo.canvasWidth,
            listOfInputs.buttonInfo.canvasHeight
        )
    }

    public build(): Button {
        return this.button;
    }
    
    public addToScene(scene: Scene): void {
        scene.addGameObject(this.button);
    }
}

export default ButtonBuilder;
import Transform from "../../engine/components/Transform";
import Vector2D from "../../engine/components/Vector2D";
import Scene from "../../engine/scene/Scene";
import CanvasView from "../../engine/view/CanvasView";
import listOfInputs from "../constant/input";
import ObjectBuilder from "../pattern/builder/ObjectBuilder";
import Bird from "./Bird";

class BirdBuilder implements ObjectBuilder {
    private bird: Bird;

    constructor(view: CanvasView){        
        this.bird = new Bird(
            listOfInputs.birdInfo.path,
            listOfInputs.birdInfo.position,
            listOfInputs.birdInfo.width,
            listOfInputs.birdInfo.height,
            new Transform(
                new Vector2D(
                    view.getCanvas().width / 4,
                    (view.getCanvas().height - listOfInputs.birdInfo.height) / 2
                )
            ),
            listOfInputs.birdInfo.canvasWidth,
            listOfInputs.birdInfo.canvasHeight,
            listOfInputs.birdInfo.speed,
            listOfInputs.birdInfo.jumpSpeed
        )
    }

    public build(): Bird {
        return this.bird;
    }

    public addToScene(scene: Scene): void {
        scene.addGameObject(this.bird);
    }
}

export default BirdBuilder;
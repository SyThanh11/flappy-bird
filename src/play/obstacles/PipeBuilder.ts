import { listOfInputs } from "../../constant/input";
import Scene from "../../engine/Scene";
import ObjectBuilder from "../../pattern/builder/ObjectBuilder";
import Pipe from "./Pipe";

class PipeBuilder implements ObjectBuilder {
    private pipe: Pipe;

    constructor(){
        new Pipe(
            listOfInputs.listOfPipesInfo.pipeInfo.pathDown,
            listOfInputs.listOfPipesInfo.pipeInfo.position,
            listOfInputs.listOfPipesInfo.pipeInfo.width,
            listOfInputs.listOfPipesInfo.pipeInfo.height,
            listOfInputs.listOfPipesInfo.pipeInfo.canvasPosition,
            listOfInputs.listOfPipesInfo.pipeInfo.canvasWidth,
            listOfInputs.listOfPipesInfo.pipeInfo.canvasHeight
        )
    }

    public build(): Pipe {
        return this.pipe;
    }

    public addToScene(scene: Scene): void {
        scene.addGameObject(this.pipe);
    }
}

export default PipeBuilder;
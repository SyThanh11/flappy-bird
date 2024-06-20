import ResourceManager from '../../engine/controller/ResourceManager'
import Scene from '../../engine/scene/Scene'
import listOfInputs from '../constant/input'
import ObjectManagerBuilder from '../pattern/builder/ObjectManagerBuilder'
import Pipe from './Pipe'
import PipeManager from './PipeManager'

class PipeManagerBuilder implements ObjectManagerBuilder<Pipe> {
    private listOfPipes: PipeManager

    constructor() {
        this.listOfPipes = new PipeManager(
            listOfInputs.listOfPipesInfo.numberOfPipes,
            new Pipe(
                ResourceManager.getInstance().getImage(15),
                listOfInputs.listOfPipesInfo.pipeInfo.position,
                listOfInputs.listOfPipesInfo.pipeInfo.width,
                listOfInputs.listOfPipesInfo.pipeInfo.height,
                listOfInputs.listOfPipesInfo.pipeInfo.canvasPosition,
                listOfInputs.listOfPipesInfo.pipeInfo.canvasWidth,
                listOfInputs.listOfPipesInfo.pipeInfo.canvasHeight
            ),
            listOfInputs.listOfPipesInfo.indexStart,
            Pipe,
            listOfInputs.listOfPipesInfo.pipeInfo.canvasPosition.getPosition(),
            listOfInputs.listOfPipesInfo.pipeInfo.space,
            ResourceManager.getInstance().getImage(16)
        )
        this.listOfPipes.setAllSpeed(listOfInputs.listOfPipesInfo.pipeInfo.speed)
    }

    public build(): PipeManager {
        return this.listOfPipes;
    }

    public addToScene(scene: Scene): void {
        scene.addListOfGameObjects(this.listOfPipes.getListOfGameObjects())
    }
}

export default PipeManagerBuilder;

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
            listOfInputs.LIST_OF_PIPES_INFO.NUMBER_OF_PIPES,
            new Pipe(
                ResourceManager.getInstance().getImage(15),
                listOfInputs.LIST_OF_PIPES_INFO.PIPE_INFO.POSITION,
                listOfInputs.LIST_OF_PIPES_INFO.PIPE_INFO.WIDTH,
                listOfInputs.LIST_OF_PIPES_INFO.PIPE_INFO.HEIGHT,
                listOfInputs.LIST_OF_PIPES_INFO.PIPE_INFO.CANVAS_POSITION,
                listOfInputs.LIST_OF_PIPES_INFO.PIPE_INFO.CANVAS_WIDTH,
                listOfInputs.LIST_OF_PIPES_INFO.PIPE_INFO.CANVAS_HEIGHT
            ),
            listOfInputs.LIST_OF_PIPES_INFO.INDEX_START,
            Pipe,
            listOfInputs.LIST_OF_PIPES_INFO.PIPE_INFO.CANVAS_POSITION.getPosition(),
            listOfInputs.LIST_OF_PIPES_INFO.PIPE_INFO.SPACE,
            ResourceManager.getInstance().getImage(16)
        )
        this.listOfPipes.setAllSpeed(listOfInputs.LIST_OF_PIPES_INFO.PIPE_INFO.SPEED)
    }

    public build(): PipeManager {
        return this.listOfPipes
    }

    public addToScene(scene: Scene): void {
        scene.addListOfGameObjects(this.listOfPipes.getListOfGameObjects())
    }
}

export default PipeManagerBuilder

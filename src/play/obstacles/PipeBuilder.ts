import ResourceManager from '../../engine/controller/ResourceManager'
import Scene from '../../engine/scene/Scene'
import listOfInputs from '../constant/input'
import ObjectBuilder from '../pattern/builder/ObjectBuilder'
import Pipe from './Pipe'

class PipeBuilder implements ObjectBuilder {
    private pipe: Pipe

    constructor() {
        new Pipe(
            ResourceManager.getInstance().getImage(15),
            listOfInputs.LIST_OF_PIPES_INFO.PIPE_INFO.POSITION,
            listOfInputs.LIST_OF_PIPES_INFO.PIPE_INFO.WIDTH,
            listOfInputs.LIST_OF_PIPES_INFO.PIPE_INFO.HEIGHT,
            listOfInputs.LIST_OF_PIPES_INFO.PIPE_INFO.CANVAS_POSITION,
            listOfInputs.LIST_OF_PIPES_INFO.PIPE_INFO.CANVAS_WIDTH,
            listOfInputs.LIST_OF_PIPES_INFO.PIPE_INFO.CANVAS_HEIGHT
        )
    }

    public build(): Pipe {
        return this.pipe
    }

    public addToScene(scene: Scene): void {
        scene.addGameObject(this.pipe)
    }
}

export default PipeBuilder

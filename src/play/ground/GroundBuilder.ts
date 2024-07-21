import ResourceManager from '../../engine/controller/ResourceManager'
import Scene from '../../engine/scene/Scene'
import listOfInputs from '../constant/input'
import ObjectBuilder from '../pattern/builder/ObjectBuilder'
import Ground from './Ground'

class GroundBuilder implements ObjectBuilder {
    private ground: Ground

    constructor() {
        this.ground = new Ground(
            ResourceManager.getInstance().getImage(12),
            listOfInputs.LIST_OF_GROUNDS_INFO.GROUND_INFO.POSITION,
            listOfInputs.LIST_OF_GROUNDS_INFO.GROUND_INFO.WIDTH,
            listOfInputs.LIST_OF_GROUNDS_INFO.GROUND_INFO.HEIGHT,
            listOfInputs.LIST_OF_GROUNDS_INFO.GROUND_INFO.CANVAS_POSITION,
            listOfInputs.LIST_OF_GROUNDS_INFO.GROUND_INFO.CANVAS_WIDTH,
            listOfInputs.LIST_OF_GROUNDS_INFO.GROUND_INFO.CANVAS_HEIGHT
        )
    }

    public build(): Ground {
        return this.ground
    }

    public addToScene(scene: Scene): void {
        scene.addGameObject(this.ground)
    }
}

export default GroundBuilder

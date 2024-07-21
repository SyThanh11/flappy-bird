import Vector2D from '../../engine/components/Vector2D'
import ResourceManager from '../../engine/controller/ResourceManager'
import Scene from '../../engine/scene/Scene'
import listOfInputs from '../constant/input'
import ObjectManagerBuilder from '../pattern/builder/ObjectManagerBuilder'
import Ground from './Ground'
import GroundManager from './GroundManager'

class GroundManagerBuilder implements ObjectManagerBuilder<Ground> {
    private listOfGrounds: GroundManager

    constructor() {
        this.listOfGrounds = new GroundManager(
            listOfInputs.LIST_OF_GROUNDS_INFO.NUMBER_OF_GROUNDS,
            new Ground(
                ResourceManager.getInstance().getImage(12),
                listOfInputs.LIST_OF_GROUNDS_INFO.GROUND_INFO.POSITION,
                listOfInputs.LIST_OF_GROUNDS_INFO.GROUND_INFO.WIDTH,
                listOfInputs.LIST_OF_GROUNDS_INFO.GROUND_INFO.HEIGHT,
                listOfInputs.LIST_OF_GROUNDS_INFO.GROUND_INFO.CANVAS_POSITION,
                listOfInputs.LIST_OF_GROUNDS_INFO.GROUND_INFO.CANVAS_WIDTH,
                listOfInputs.LIST_OF_GROUNDS_INFO.GROUND_INFO.CANVAS_HEIGHT
            ),
            listOfInputs.LIST_OF_GROUNDS_INFO.INDEX_START,
            Ground,
            new Vector2D(
                listOfInputs.LIST_OF_GROUNDS_INFO.GROUND_INFO.CANVAS_WIDTH,
                listOfInputs.LIST_OF_GROUNDS_INFO.GROUND_INFO.CANVAS_POSITION.getPosition().getY()
            )
        )
        this.listOfGrounds.setAllSpeed(listOfInputs.LIST_OF_GROUNDS_INFO.GROUND_INFO.SPEED)
    }

    public build(): GroundManager {
        return this.listOfGrounds
    }

    public addToScene(scene: Scene): void {
        scene.addListOfGameObjects(this.listOfGrounds.getListOfGameObjects())
    }
}

export default GroundManagerBuilder

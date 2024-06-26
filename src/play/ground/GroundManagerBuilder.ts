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
            listOfInputs.listOfGroundsInfo.numberOfGrounds,
            new Ground(
                ResourceManager.getInstance().getImage(12),
                listOfInputs.listOfGroundsInfo.groundInfo.position,
                listOfInputs.listOfGroundsInfo.groundInfo.width,
                listOfInputs.listOfGroundsInfo.groundInfo.height,
                listOfInputs.listOfGroundsInfo.groundInfo.canvasPosition,
                listOfInputs.listOfGroundsInfo.groundInfo.canvasWidth,
                listOfInputs.listOfGroundsInfo.groundInfo.canvasHeight
            ),
            listOfInputs.listOfGroundsInfo.indexStart,
            Ground,
            new Vector2D(
                listOfInputs.listOfGroundsInfo.groundInfo.canvasWidth,
                listOfInputs.listOfGroundsInfo.groundInfo.canvasPosition.getPosition().getY()
            )
        )
        this.listOfGrounds.setAllSpeed(listOfInputs.listOfGroundsInfo.groundInfo.speed)
    }

    public build(): GroundManager {
        return this.listOfGrounds
    }

    public addToScene(scene: Scene): void {
        scene.addListOfGameObjects(this.listOfGrounds.getListOfGameObjects())
    }
}

export default GroundManagerBuilder

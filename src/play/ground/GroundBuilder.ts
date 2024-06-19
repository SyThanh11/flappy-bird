import listOfInputs from '../../constant/input'
import Scene from '../../engine/Scene'
import ObjectBuilder from '../../pattern/builder/ObjectBuilder'
import Ground from './Ground'

class GroundBuilder implements ObjectBuilder {
    private ground: Ground

    constructor() {
        this.ground = new Ground(
            listOfInputs.listOfGroundsInfo.groundInfo.path,
            listOfInputs.listOfGroundsInfo.groundInfo.position,
            listOfInputs.listOfGroundsInfo.groundInfo.width,
            listOfInputs.listOfGroundsInfo.groundInfo.height,
            listOfInputs.listOfGroundsInfo.groundInfo.canvasPosition,
            listOfInputs.listOfGroundsInfo.groundInfo.canvasWidth,
            listOfInputs.listOfGroundsInfo.groundInfo.canvasHeight
        )
    }

    public build(): Ground {
        return this.ground
    }

    public addToScene(scene: Scene): void {
        scene.addGameObject(this.ground)
    }
}

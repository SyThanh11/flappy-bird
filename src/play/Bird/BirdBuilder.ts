import Transform from '../../engine/components/Transform'
import Vector2D from '../../engine/components/Vector2D'
import ResourceManager from '../../engine/controller/ResourceManager'
import Scene from '../../engine/scene/Scene'
import listOfInputs from '../constant/input'
import ObjectBuilder from '../pattern/builder/ObjectBuilder'
import Bird from './Bird'

class BirdBuilder implements ObjectBuilder {
    private bird: Bird

    constructor() {
        this.bird = new Bird(
            ResourceManager.getInstance().getImage(18),
            listOfInputs.birdInfo.position,
            listOfInputs.birdInfo.width,
            listOfInputs.birdInfo.height,
            new Transform(new Vector2D(800 / 4, (510 - listOfInputs.birdInfo.height) / 2)),
            listOfInputs.birdInfo.canvasWidth,
            listOfInputs.birdInfo.canvasHeight,
            listOfInputs.birdInfo.speed,
            listOfInputs.birdInfo.jumpSpeed
        )
    }

    public build(): Bird {
        return this.bird
    }

    public addToScene(scene: Scene): void {
        scene.addGameObject(this.bird)
    }
}

export default BirdBuilder

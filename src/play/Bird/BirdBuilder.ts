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
            ResourceManager.getInstance().getImageByKey('yellowbird-downflap'),
            listOfInputs.BIRD_INFO.POSITION,
            listOfInputs.BIRD_INFO.WIDTH,
            listOfInputs.BIRD_INFO.HEIGHT,
            new Transform(new Vector2D(800 / 4, (510 - listOfInputs.BIRD_INFO.HEIGHT) / 2)),
            listOfInputs.BIRD_INFO.CANVAS_WIDTH,
            listOfInputs.BIRD_INFO.CANVAS_HEIGHT,
            listOfInputs.BIRD_INFO.SPEED,
            listOfInputs.BIRD_INFO.JUMP_SPEED
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

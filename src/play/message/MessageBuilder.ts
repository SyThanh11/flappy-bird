import Transform from '../../engine/components/Transform'
import Vector2D from '../../engine/components/Vector2D'
import ResourceManager from '../../engine/controller/ResourceManager'
import GameImage from '../../engine/gameObject/GameImage'
import Scene from '../../engine/scene/Scene'
import listOfInputs from '../constant/input'
import ObjectBuilder from '../pattern/builder/ObjectBuilder'

class MessageBuilder implements ObjectBuilder {
    private message: GameImage

    constructor() {
        this.message = new GameImage(
            ResourceManager.getInstance().getImage(14),
            listOfInputs.MESSAGE_INFO.POSITION,
            listOfInputs.MESSAGE_INFO.WIDTH,
            listOfInputs.MESSAGE_INFO.HEIGHT,
            new Transform(
                new Vector2D(
                    (800 - listOfInputs.MESSAGE_INFO.CANVAS_WIDTH) / 2,
                    (510 - listOfInputs.MESSAGE_INFO.CANVAS_HEIGHT - listOfInputs.MESSAGE_INFO.DY) /
                        2
                )
            ),
            listOfInputs.MESSAGE_INFO.CANVAS_WIDTH,
            listOfInputs.MESSAGE_INFO.CANVAS_HEIGHT
        )
    }

    public build(): GameImage {
        return this.message
    }

    public addToScene(scene: Scene): void {
        scene.addGameObject(this.message)
    }
}

export default MessageBuilder

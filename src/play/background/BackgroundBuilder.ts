import Transform from '../../engine/components/Transform'
import Vector2D from '../../engine/components/Vector2D'
import ResourceManager from '../../engine/controller/ResourceManager'
import GameImage from '../../engine/gameObject/GameImage'
import listOfInputs from '../constant/input'
import ObjectBuilder from '../pattern/builder/ObjectBuilder'

class BackgroundBuilder implements ObjectBuilder {
    private background: GameImage

    constructor() {
        this.background = new GameImage(
            ResourceManager.getInstance().getImage(11),
            new Transform(
                new Vector2D(
                    listOfInputs.LIST_OF_BACKGROUNDS_INFO.BACKGROUND_INFO.POSITION.getX(),
                    listOfInputs.LIST_OF_BACKGROUNDS_INFO.BACKGROUND_INFO.POSITION.getY()
                )
            ),
            listOfInputs.LIST_OF_BACKGROUNDS_INFO.BACKGROUND_INFO.WIDTH,
            listOfInputs.LIST_OF_BACKGROUNDS_INFO.BACKGROUND_INFO.HEIGHT,
            new Transform(
                new Vector2D(
                    listOfInputs.LIST_OF_BACKGROUNDS_INFO.BACKGROUND_INFO.CANVAS_POSITION.getX(),
                    listOfInputs.LIST_OF_BACKGROUNDS_INFO.BACKGROUND_INFO.CANVAS_POSITION.getY()
                )
            ),
            listOfInputs.LIST_OF_BACKGROUNDS_INFO.BACKGROUND_INFO.CANVAS_WIDTH,
            listOfInputs.LIST_OF_BACKGROUNDS_INFO.BACKGROUND_INFO.CANVAS_HEIGHT
        )
    }

    public build(): GameImage {
        return this.background
    }
}

export default BackgroundBuilder

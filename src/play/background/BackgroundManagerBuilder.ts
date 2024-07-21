import Vector2D from '../../engine/components/Vector2D'
import GameImage from '../../engine/gameObject/GameImage'
import GameObjectManager from '../../engine/gameObject/GameObjectManager'
import Scene from '../../engine/scene/Scene'
import listOfInputs from '../constant/input'
import ObjectManagerBuilder from '../pattern/builder/ObjectManagerBuilder'
import BackgroundBuilder from './BackgroundBuilder'

class BackgroundManagerBuilder implements ObjectManagerBuilder<GameImage> {
    private listOfBackgrounds: GameObjectManager<GameImage>

    constructor() {
        const backgroundBuilder = new BackgroundBuilder()

        this.listOfBackgrounds = new GameObjectManager(
            listOfInputs.LIST_OF_BACKGROUNDS_INFO.NUMBER_OF_BACKGROUNDS,
            backgroundBuilder.build(),
            listOfInputs.LIST_OF_BACKGROUNDS_INFO.INDEX_START,
            GameImage,
            new Vector2D(
                listOfInputs.LIST_OF_BACKGROUNDS_INFO.BACKGROUND_INFO.CANVAS_WIDTH,
                listOfInputs.LIST_OF_BACKGROUNDS_INFO.BACKGROUND_INFO.CANVAS_POSITION.getY()
            )
        )
    }

    public build(): GameObjectManager<GameImage> {
        return this.listOfBackgrounds
    }

    public addToScene(scene: Scene): void {
        scene.addListOfGameObjects(this.listOfBackgrounds.getListOfGameObjects())
    }
}

export default BackgroundManagerBuilder

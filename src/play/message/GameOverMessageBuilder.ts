import Transform from '../../engine/components/Transform'
import Vector2D from '../../engine/components/Vector2D'
import ResourceManager from '../../engine/controller/ResourceManager'
import GameImage from '../../engine/gameObject/GameImage'
import Scene from '../../engine/scene/Scene'
import listOfInputs from '../constant/input'
import ObjectBuilder from '../pattern/builder/ObjectBuilder'

class GameOverMessageBuilder implements ObjectBuilder {
    private gameOverMessage: GameImage

    constructor() {
        this.gameOverMessage = new GameImage(
            ResourceManager.getInstance().getImageByKey('sprite'),
            listOfInputs.GAME_OVER_MESSAGE_INFO.POSITION,
            listOfInputs.GAME_OVER_MESSAGE_INFO.WIDTH,
            listOfInputs.GAME_OVER_MESSAGE_INFO.HEIGHT,
            new Transform(
                new Vector2D(
                    (800 - listOfInputs.GAME_OVER_MESSAGE_INFO.CANVAS_WIDTH) / 2,
                    listOfInputs.GAME_OVER_MESSAGE_INFO.CANVAS_HEIGHT +
                        listOfInputs.GAME_OVER_MESSAGE_INFO.DY
                )
            ),
            listOfInputs.GAME_OVER_MESSAGE_INFO.CANVAS_WIDTH,
            listOfInputs.GAME_OVER_MESSAGE_INFO.CANVAS_HEIGHT
        )
    }

    build(): GameImage {
        return this.gameOverMessage
    }

    public addToScene(scene: Scene): void {
        scene.addGameObject(this.gameOverMessage)
    }
}

export default GameOverMessageBuilder

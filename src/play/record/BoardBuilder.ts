import Transform from '../../engine/components/Transform'
import Vector2D from '../../engine/components/Vector2D'
import ResourceManager from '../../engine/controller/ResourceManager'
import GameImage from '../../engine/gameObject/GameImage'
import Scene from '../../engine/scene/Scene'
import listOfInputs from '../constant/input'
import ObjectBuilder from '../pattern/builder/ObjectBuilder'

class BoardBuilder implements ObjectBuilder {
    private board: GameImage

    constructor() {
        this.board = new GameImage(
            ResourceManager.getInstance().getImageByKey('sprite'),
            listOfInputs.BOARD_INFO.POSITION,
            listOfInputs.BOARD_INFO.WIDTH,
            listOfInputs.BOARD_INFO.HEIGHT,
            new Transform(
                new Vector2D(
                    (800 - listOfInputs.BOARD_INFO.CANVAS_WIDTH) / 2,
                    listOfInputs.BOARD_INFO.CANVAS_HEIGHT + listOfInputs.BOARD_INFO.DY
                )
            ),
            listOfInputs.BOARD_INFO.CANVAS_WIDTH,
            listOfInputs.BOARD_INFO.CANVAS_HEIGHT
        )
    }

    public build(): GameImage {
        return this.board
    }

    public addToScene(scene: Scene): void {
        scene.addGameObject(this.board)
    }
}

export default BoardBuilder

import Transform from '../../engine/components/Transform'
import Vector2D from '../../engine/components/Vector2D'
import ResourceManager from '../../engine/controller/ResourceManager'
import Scene from '../../engine/scene/Scene'
import listOfInputs from '../constant/input'
import ObjectBuilder from '../pattern/builder/ObjectBuilder'
import Button from './Button'

class ButtonBuilder implements ObjectBuilder {
    private button: Button

    constructor() {
        this.button = new Button(
            ResourceManager.getInstance().getImageByKey('sprite'),
            listOfInputs.BUTTON_INFO.POSITION,
            listOfInputs.BUTTON_INFO.WIDTH,
            listOfInputs.BUTTON_INFO.HEIGHT,
            new Transform(
                new Vector2D(
                    (800 - listOfInputs.BUTTON_INFO.CANVAS_WIDTH) / 2,
                    (510 + listOfInputs.BUTTON_INFO.CANVAS_HEIGHT + listOfInputs.BUTTON_INFO.DY) / 2
                )
            ),
            listOfInputs.BUTTON_INFO.CANVAS_WIDTH,
            listOfInputs.BUTTON_INFO.CANVAS_HEIGHT
        )

        this.button.setActive(false)
    }

    public build(): Button {
        return this.button
    }

    public addToScene(scene: Scene): void {
        scene.addGameObject(this.button)
    }
}

export default ButtonBuilder

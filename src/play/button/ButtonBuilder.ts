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
            ResourceManager.getInstance().getImage(17),
            listOfInputs.buttonInfo.position,
            listOfInputs.buttonInfo.width,
            listOfInputs.buttonInfo.height,
            new Transform(
                new Vector2D(
                    (800 - listOfInputs.buttonInfo.canvasWidth) / 2,
                    (510 + listOfInputs.buttonInfo.canvasHeight + listOfInputs.buttonInfo.dY) / 2
                )
            ),
            listOfInputs.buttonInfo.canvasWidth,
            listOfInputs.buttonInfo.canvasHeight
        )
    }

    public build(): Button {
        return this.button
    }

    public addToScene(scene: Scene): void {
        scene.addGameObject(this.button)
    }
}

export default ButtonBuilder

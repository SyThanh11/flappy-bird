import listOfInputs from '../../constant/input'
import Scene from '../../engine/Scene'
import Transform from '../../engine/components/Transform'
import Vector2D from '../../engine/components/Vector2D'
import ObjectBuilder from '../../pattern/builder/ObjectBuilder'
import Background from './Background'

class BackgroundBuilder implements ObjectBuilder {
    private background: Background

    constructor() {
        this.background = new Background(
            listOfInputs.listOfBackgroundsInfo.backgroundInfo.path,
            new Transform(
                new Vector2D(
                    listOfInputs.listOfBackgroundsInfo.backgroundInfo.position.getX(),
                    listOfInputs.listOfBackgroundsInfo.backgroundInfo.position.getY()
                )
            ),
            listOfInputs.listOfBackgroundsInfo.backgroundInfo.width,
            listOfInputs.listOfBackgroundsInfo.backgroundInfo.height,
            new Transform(
                new Vector2D(
                    listOfInputs.listOfBackgroundsInfo.backgroundInfo.canvasPosition.getX(),
                    listOfInputs.listOfBackgroundsInfo.backgroundInfo.canvasPosition.getY()
                )
            ),
            listOfInputs.listOfBackgroundsInfo.backgroundInfo.canvasWidth,
            listOfInputs.listOfBackgroundsInfo.backgroundInfo.canvasHeight
        )
    }

    public build(): Background {
        return this.background
    }

    public addToScene(scene: Scene): void {
        scene.addGameObject(this.background)
    }
}

export default BackgroundBuilder;

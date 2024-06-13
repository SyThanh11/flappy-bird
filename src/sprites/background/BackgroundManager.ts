import GameObjectManager from '../../abstract/GameObjectManager'
import Vector2D from '../Vector2D'
import Background from './Background'

class BackgroundManager extends GameObjectManager<Background> {
    constructor(listOfGameObjects: Background[]) {
        super(listOfGameObjects)
    }

    public create(numberOfGameObjects: number, gameObject: Background): void {
        let listOfBackgrounds: Background[] = []
        for (let i = 0; i < numberOfGameObjects; i++) {
            let newCanvasPosition = new Vector2D(
                i * gameObject.getCanvasWidth(),
                gameObject.getCanvasPosition().getY()
            )
            let newBackground: Background = new Background(
                gameObject.getPath(),
                gameObject.getPosition(),
                gameObject.getWidth(),
                gameObject.getHeight(),
                newCanvasPosition,
                gameObject.getCanvasWidth(),
                gameObject.getCanvasHeight(),
                gameObject.getSpeed()
            )
            listOfBackgrounds.push(newBackground)
        }
        this.setListOfGameObjects(listOfBackgrounds)
    }

    public draw(context: CanvasRenderingContext2D): void {
        this.listOfGameObjects.forEach((background) => {
            background.draw(context)
        })
    }

    public update(deltaTime: number): void {
        this.listOfGameObjects.forEach((background) => {
            background.update(deltaTime)
        })
    }
}

export default BackgroundManager

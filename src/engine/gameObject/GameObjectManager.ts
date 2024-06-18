import Transform from '../components/Transform'
import Vector2D from '../components/Vector2D'
import GameObject from './GameObject'

abstract class GameObjectManager<T extends GameObject> {
    protected listOfGameObjects: T[] = []

    constructor(
        numberOfGameObjects: number,
        gameObject: T,
        indexStart: number,
        gameObjectContructor: {
            new (
                path: string,
                position: Transform,
                width: number,
                height: number,
                canvasPosition: Transform,
                canvasWidth: number,
                canvasHeight: number
            ): T
        },
        dPosition: Vector2D
    ) {
        for (let i = indexStart; i < numberOfGameObjects; i++) {
            let newCanvasPosition = new Transform(
                new Vector2D(i * dPosition.getX(), dPosition.getY())
            )

            let newGameObject = new gameObjectContructor(
                gameObject.getPath(),
                gameObject.getTransform(),
                gameObject.getWidth(),
                gameObject.getHeight(),
                newCanvasPosition,
                gameObject.getCanvasWidth(),
                gameObject.getCanvasHeight()
            )
            this.listOfGameObjects.push(newGameObject)
        }
    }

    // getter
    public getListOfGameObjects(): T[] {
        return this.listOfGameObjects
    }

    // setter
    public setListOfGameObjects(listOfGameObjects: T[]): void {
        this.listOfGameObjects = listOfGameObjects
    }
    public setAllLayer(layer: number): void {
        this.listOfGameObjects.forEach((gameObject: GameObject) => gameObject.setLayer(layer))
    }
    public setAllActive(active: boolean): void {
        this.listOfGameObjects.forEach((gameObject: GameObject) => gameObject.setActive(active))
    }

    // abstract method
    public draw(context: CanvasRenderingContext2D): void {}
    public abstract update(deltaTime: number): void
}

export default GameObjectManager

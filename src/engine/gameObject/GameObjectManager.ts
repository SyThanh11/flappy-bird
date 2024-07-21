import Transform from '../components/Transform'
import Vector2D from '../components/Vector2D'
import GameObject from './GameObject'

class GameObjectManager<T extends GameObject> {
    protected listOfGameObjects: T[] = []

    constructor(
        numberOfGameObjects: number,
        gameObject: T,
        indexStart: number,
        gameObjectConstructor: {
            new (
                image: HTMLImageElement,
                position: Transform,
                width: number,
                height: number,
                canvasPosition: Transform,
                canvasWidth: number,
                canvasHeight: number,
                isStatic: boolean
            ): T
        },
        dPosition: Vector2D
    ) {
        for (let i = indexStart; i < numberOfGameObjects; i++) {
            const newCanvasPosition = new Transform(
                new Vector2D(i * dPosition.getX(), dPosition.getY())
            )

            const newGameObject = new gameObjectConstructor(
                gameObject.getImage(),
                gameObject.getTransform(),
                gameObject.getWidth(),
                gameObject.getHeight(),
                newCanvasPosition,
                gameObject.getCanvasWidth(),
                gameObject.getCanvasHeight(),
                gameObject.getIsStatic()
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

    public draw(_context: CanvasRenderingContext2D): void {}
    public update(_deltaTime: number): void {}
}

export default GameObjectManager

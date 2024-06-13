import GameObject from './GameObject'

abstract class GameObjectManager<T extends GameObject> {
    protected listOfGameObjects: T[]

    constructor(listOfGameObjects: T[]) {
        this.listOfGameObjects = listOfGameObjects
    }

    // getter
    public getListOfGameObjects(): T[] {
        return this.listOfGameObjects
    }

    // setter
    public setListOfGameObjects(listOfGameObjects: T[]): void {
        this.listOfGameObjects = listOfGameObjects
    }

    // abstract method
    public abstract create(
        numberOfGameObjects: number,
        gameObject: T,
        canvas?: HTMLCanvasElement
    ): void
    public abstract draw(context: CanvasRenderingContext2D): void
    public abstract update(
        deltaTime: number,
        canvas?: HTMLCanvasElement,
        dX?: number,
        dY?: number,
        newSpace?: number
    ): void
}

export default GameObjectManager

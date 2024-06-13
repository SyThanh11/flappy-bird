import GameObjectManager from '../../abstract/GameObjectManager'
import Vector2D from '../Vector2D'
import Pipe from './Pipe'

class PipeManager extends GameObjectManager<Pipe> {
    private isDestroyed = false;

    constructor(listOfGameObjects: Pipe[]) {
        super(listOfGameObjects)
    }

    // getter
    public getIsDestroyed(): boolean {
        return this.isDestroyed
    }

    // setter
    public setIsDestroyed(isDestroyed: boolean): void {
        this.isDestroyed = isDestroyed
    }

    public create(numberOfGameObjects: number, gameObject: Pipe): void {
        let listOfPipes: Pipe[] = []
        for (let i = 1; i < numberOfGameObjects; i++) {
            let newCanvasPosition = new Vector2D(
                i * gameObject.getCanvasPosition().getX(),
                gameObject.getCanvasPosition().getY()
            )
            let newPipe: Pipe = new Pipe(
                gameObject.getPath(),
                gameObject.getPosition(),
                gameObject.getWidth(),
                gameObject.getHeight(),
                newCanvasPosition,
                gameObject.getCanvasWidth(),
                gameObject.getCanvasHeight(),
                gameObject.getSpeed(),
                gameObject.getSpace()
            )
            listOfPipes.push(newPipe)
        }
        this.setListOfGameObjects(listOfPipes)
    }

    public draw(context: CanvasRenderingContext2D) {
        this.listOfGameObjects.forEach((pipe) => {
            pipe.draw(context)
        })
    }

    public update(
        deltaTime: number,
        canvas: HTMLCanvasElement,
        dX: number,
        dY: number,
        newSpace: number
    ): void {
        this.getListOfGameObjects().forEach((pipe) => {
            pipe.update(deltaTime)
        })
        if (
            this.listOfGameObjects[0].getCanvasPosition().getX() <=
            -this.listOfGameObjects[0].getCanvasWidth()
        ) {
            this.setIsDestroyed(true)
            this.listOfGameObjects.splice(0, 1)
            this.listOfGameObjects.push(
                new Pipe(
                    this.listOfGameObjects[0].getPath(),
                    this.listOfGameObjects[0].getPosition(),
                    this.listOfGameObjects[0].getWidth(),
                    this.listOfGameObjects[0].getHeight(),
                    new Vector2D(
                        this.listOfGameObjects[this.listOfGameObjects.length - 1]
                            .getCanvasPosition()
                            .getX() + dX,
                        dY
                    ),
                    this.listOfGameObjects[0].getCanvasWidth(),
                    this.listOfGameObjects[0].getCanvasHeight(),
                    this.listOfGameObjects[0].getSpeed(),
                    newSpace
                )
            )
        }
    }
}

export default PipeManager

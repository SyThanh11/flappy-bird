import GameObjectManager from '../../abstract/GameObjectManager'
import Vector2D from '../Vector2D'
import Ground from './Ground'

class GroundManager extends GameObjectManager<Ground> {
    constructor(listOfGameObjects: Ground[]) {
        super(listOfGameObjects)
    }

    public create(numberOfGameObjects: number, gameObject: Ground): void {
        let listOfGrounds: Ground[] = []
        for (let i = 0; i < numberOfGameObjects; i++) {
            let newCanvasPosition = new Vector2D(
                i * gameObject.getCanvasWidth(),
                gameObject.getCanvasPosition().getY()
            )
            let newGround: Ground = new Ground(
                gameObject.getPath(),
                gameObject.getPosition(),
                gameObject.getWidth(),
                gameObject.getHeight(),
                newCanvasPosition,
                gameObject.getCanvasWidth(),
                gameObject.getCanvasHeight(),
                gameObject.getSpeed()
            )
            listOfGrounds.push(newGround)
        }
        this.setListOfGameObjects(listOfGrounds)
    }

    public draw(context: CanvasRenderingContext2D): void {
        this.listOfGameObjects.forEach((ground) => {
            ground.draw(context)
        })
    }

    public update(deltaTime: number): void {
        this.listOfGameObjects.forEach((ground) => {
            ground.update(deltaTime)
        })

        if (
            this.listOfGameObjects[0].getCanvasPosition().getX() <=
            -this.listOfGameObjects[0].getCanvasWidth()
        ) {
            this.listOfGameObjects.splice(0, 1)
            this.listOfGameObjects.push(
                new Ground(
                    this.listOfGameObjects[0].getPath(),
                    this.listOfGameObjects[0].getPosition(),
                    this.listOfGameObjects[0].getWidth(),
                    this.listOfGameObjects[0].getHeight(),
                    new Vector2D(
                        this.listOfGameObjects[this.listOfGameObjects.length - 1]
                            .getCanvasPosition()
                            .getX() + this.listOfGameObjects[0].getCanvasWidth(),
                        510 - this.listOfGameObjects[0].getCanvasHeight()
                    ),
                    this.listOfGameObjects[0].getCanvasWidth(),
                    this.listOfGameObjects[0].getCanvasHeight(),
                    this.listOfGameObjects[0].getSpeed()
                )
            )
        }
    }
}

export default GroundManager

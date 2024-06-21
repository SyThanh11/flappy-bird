import Transform from '../../engine/components/Transform'
import Vector2D from '../../engine/components/Vector2D'
import GameObjectManager from '../../engine/gameObject/GameObjectManager'
import Scene from '../../engine/scene/Scene'
import SceneManager from '../../engine/scene/SceneManager'
import { random } from '../helper/helper'
import Pipe from './Pipe'

class PipeManager extends GameObjectManager<Pipe> {
    constructor(
        numberOfGameObjects: number,
        gameObject: Pipe,
        indexStart: number,
        gameObjectConstructor: {
            new (
                image: HTMLImageElement,
                position: Transform,
                width: number,
                height: number,
                canvasPosition: Transform,
                canvasWidth: number,
                canvasHeight: number
            ): Pipe
        },
        dPosition: Vector2D,
        space: number,
        otherImage: HTMLImageElement
    ) {
        super(numberOfGameObjects, gameObject, indexStart, gameObjectConstructor, dPosition)
        for (let i = indexStart; i < numberOfGameObjects; i++) {
            let newCanvasPosition = new Transform(
                new Vector2D(
                    i * dPosition.getX(),
                    dPosition.getY() + gameObject.getHeight() + space
                )
            )

            let newGameObject = new gameObjectConstructor(
                otherImage,
                gameObject.getTransform(),
                gameObject.getWidth(),
                gameObject.getHeight(),
                newCanvasPosition,
                gameObject.getCanvasWidth(),
                gameObject.getCanvasHeight()
            )
            this.listOfGameObjects.push(newGameObject)
        }

        this.sortCanvasPosition()
    }

    private sortCanvasPosition(): void {
        this.listOfGameObjects.sort((a, b) => {
            return a.getCanvasPosition().getX() - b.getCanvasPosition().getX()
        })
    }

    private isDestroyed: boolean = false

    public getIsDestroyed(): boolean {
        return this.isDestroyed
    }
    public setIsDestroyed(isDestroyed: boolean): void {
        this.isDestroyed = isDestroyed
    }

    public setAllSpeed(speed: number): void {
        this.listOfGameObjects.forEach((gameObject) => gameObject.setSpeed(speed))
    }

    public findFirstPipes(scene: Scene): number {
        for (let i = 0; i < scene.listOfGameObjects.length; i++) {
            if (scene.listOfGameObjects[i] instanceof Pipe) {
                return i
            }
        }
        return 0
    }

    public findLastPipes(scene: Scene): number {
        for (let i = scene.listOfGameObjects.length - 1; i >= 0; i--) {
            if (scene.listOfGameObjects[i] instanceof Pipe) {
                return i
            }
        }
        return 0
    }

    public update(deltaTime: number): void {
        const firstIndex = this.findFirstPipes(SceneManager.getInstance().getScene('gamePlay'))
            const lastIndex = this.findLastPipes(SceneManager.getInstance().getScene('gamePlay'))

            const firstPipesObject: Pipe = SceneManager.getInstance().getScene('gamePlay').listOfGameObjects[firstIndex] as Pipe
            const secondPipesObject: Pipe = SceneManager.getInstance().getScene('gamePlay').listOfGameObjects[firstIndex + 1] as Pipe

            const secondLastPipesObject: Pipe = SceneManager.getInstance().getScene('gamePlay').listOfGameObjects[lastIndex - 1] as Pipe
            const lastPipesObject: Pipe = SceneManager.getInstance().getScene('gamePlay').listOfGameObjects[lastIndex] as Pipe

            if (firstPipesObject.getCanvasPosition().getX() <= -firstPipesObject.getCanvasWidth()) {
                this.listOfGameObjects.splice(0, 2)
                this.isDestroyed = true
                const newPipeTop = new Pipe(
                    firstPipesObject.getImage(),
                    firstPipesObject.getTransform(),
                    firstPipesObject.getWidth(),
                    firstPipesObject.getHeight(),
                    new Transform(
                        new Vector2D(
                            lastPipesObject.getCanvasPosition().getX() + random(500, 600),
                            random(-200, -100)
                        )
                    ),
                    firstPipesObject.getCanvasWidth(),
                    firstPipesObject.getCanvasHeight()
                )
                newPipeTop.setSpeed(firstPipesObject.getSpeed())
                newPipeTop.setLayer(firstPipesObject.getLayer())
                newPipeTop.setActive(firstPipesObject.getIsActive())

                const newPipeBottom = new Pipe(
                    secondPipesObject.getImage(),
                    secondPipesObject.getTransform(),
                    secondPipesObject.getWidth(),
                    secondPipesObject.getHeight(),
                    new Transform(
                        new Vector2D(
                            newPipeTop.getCanvasPosition().getX(),
                            newPipeTop.getCanvasPosition().getY() +
                                newPipeTop.getCanvasHeight() +
                                random(50, 70)
                        )
                    ),
                    secondPipesObject.getCanvasWidth(),
                    secondPipesObject.getCanvasHeight()
                )
                newPipeBottom.setSpeed(secondLastPipesObject.getSpeed())
                newPipeBottom.setLayer(secondLastPipesObject.getLayer())
                newPipeBottom.setActive(secondLastPipesObject.getIsActive())

                this.listOfGameObjects.push(newPipeTop)
                this.listOfGameObjects.push(newPipeBottom)

                SceneManager.getInstance().getScene('gamePlay').addGameObject(newPipeTop)
                SceneManager.getInstance().getScene('gamePlay').addGameObject(newPipeBottom)
                SceneManager.getInstance().getScene('gamePlay').removeGameObject(firstPipesObject)
                SceneManager.getInstance().getScene('gamePlay').removeGameObject(secondPipesObject)
            }
    }
}

export default PipeManager

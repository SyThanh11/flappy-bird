import Transform from '../../engine/components/Transform'
import Vector2D from '../../engine/components/Vector2D'
import GameObjectManager from '../../engine/gameObject/GameObjectManager'
import Scene from '../../engine/scene/Scene'
import SceneManager from '../../engine/scene/SceneManager'
import LIST_OF_INPUTS from '../constant/input'
import HELPER from '../helper/helper'
import Pipe from './Pipe'

class PipeManager extends GameObjectManager<Pipe> {
    private internalTimer = 0
    private speed = 0

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
            const newCanvasPosition = new Transform(
                new Vector2D(
                    i * dPosition.getX(),
                    dPosition.getY() + gameObject.getHeight() + space
                )
            )

            const newGameObject = new gameObjectConstructor(
                otherImage,
                gameObject.getTransform(),
                gameObject.getWidth(),
                gameObject.getHeight(),
                newCanvasPosition,
                gameObject.getCanvasWidth(),
                gameObject.getCanvasHeight()
            )
            this.getListOfGameObjects().push(newGameObject)
        }

        this.speed = LIST_OF_INPUTS.LIST_OF_PIPES_INFO.PIPE_INFO.SPEED
        this.sortCanvasPosition()
    }

    private sortCanvasPosition(): void {
        this.getListOfGameObjects().sort((a, b) => {
            return a.getCanvasPosition().getX() - b.getCanvasPosition().getX()
        })
    }

    private isDestroyed = false

    public getIsDestroyed(): boolean {
        return this.isDestroyed
    }
    public setIsDestroyed(isDestroyed: boolean): void {
        this.isDestroyed = isDestroyed
    }

    public setAllSpeed(speed: number): void {
        this.getListOfGameObjects().forEach((gameObject) => gameObject.setSpeed(speed))
    }

    public findFirstPipes(scene: Scene): number {
        for (let i = 0; i < scene.getListOfGameObjects().length; i++) {
            if (scene.getListOfGameObjects()[i] instanceof Pipe) {
                return i
            }
        }
        return 0
    }

    public findLastPipes(scene: Scene): number {
        for (let i = scene.getListOfGameObjects().length - 1; i >= 0; i--) {
            if (scene.getListOfGameObjects()[i] instanceof Pipe) {
                return i
            }
        }
        return 0
    }

    public update(deltaTime: number): void {
        this.internalTimer += deltaTime
        if (this.internalTimer == 2.0) {
            this.speed += 50
            this.internalTimer = 0
        }

        const firstIndex = this.findFirstPipes(SceneManager.getInstance().getScene('gamePlay'))
        const lastIndex = this.findLastPipes(SceneManager.getInstance().getScene('gamePlay'))

        const firstPipesObject: Pipe = SceneManager.getInstance()
            .getScene('gamePlay')
            .getListOfGameObjects()[firstIndex] as Pipe
        const secondPipesObject: Pipe = SceneManager.getInstance()
            .getScene('gamePlay')
            .getListOfGameObjects()[firstIndex + 1] as Pipe

        const secondLastPipesObject: Pipe = SceneManager.getInstance()
            .getScene('gamePlay')
            .getListOfGameObjects()[lastIndex - 1] as Pipe
        const lastPipesObject: Pipe = SceneManager.getInstance()
            .getScene('gamePlay')
            .getListOfGameObjects()[lastIndex] as Pipe

        if (firstPipesObject.getCanvasPosition().getX() <= -firstPipesObject.getCanvasWidth()) {
            this.getListOfGameObjects().splice(0, 2)
            this.isDestroyed = true
            const newPipeTop = new Pipe(
                firstPipesObject.getImage(),
                firstPipesObject.getTransform(),
                firstPipesObject.getWidth(),
                firstPipesObject.getHeight(),
                new Transform(
                    new Vector2D(
                        lastPipesObject.getCanvasPosition().getX() + HELPER.random(500, 600),
                        HELPER.random(-200, -100)
                    )
                ),
                firstPipesObject.getCanvasWidth(),
                firstPipesObject.getCanvasHeight()
            )
            newPipeTop.setSpeed(this.speed)
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
                            HELPER.random(75, 80)
                    )
                ),
                secondPipesObject.getCanvasWidth(),
                secondPipesObject.getCanvasHeight()
            )
            newPipeBottom.setSpeed(this.speed)
            newPipeBottom.setLayer(secondLastPipesObject.getLayer())
            newPipeBottom.setActive(secondLastPipesObject.getIsActive())

            this.getListOfGameObjects().push(newPipeTop)
            this.getListOfGameObjects().push(newPipeBottom)

            SceneManager.getInstance().getScene('gamePlay').addGameObject(newPipeTop)
            SceneManager.getInstance().getScene('gamePlay').addGameObject(newPipeBottom)
            SceneManager.getInstance().getScene('gamePlay').removeGameObject(firstPipesObject)
            SceneManager.getInstance().getScene('gamePlay').removeGameObject(secondPipesObject)
        }
    }
}

export default PipeManager

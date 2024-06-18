import Scene from '../../engine/Scene'
import Transform from '../../engine/components/Transform'
import Vector2D from '../../engine/components/Vector2D'
import GameObjectManager from '../../engine/gameObject/GameObjectManager'
import { random } from '../../helper/helper'
import Pipe from './Pipe'

class PipeManager extends GameObjectManager<Pipe> {
    private isDestroyed: boolean = false;

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

    public update(deltaTime: number, scene?: Scene): void {
        if (scene) {
            const firstIndex = this.findFirstPipes(scene)
            const lastIndex = this.findLastPipes(scene)

            const firstPipesObject: Pipe = scene.listOfGameObjects[firstIndex] as Pipe
            const lastPipesObject: Pipe = scene.listOfGameObjects[lastIndex] as Pipe

            if (firstPipesObject.getCanvasPosition().getX() <= -firstPipesObject.getCanvasWidth()) {
                this.isDestroyed = true
                const newPipe = new Pipe(
                    firstPipesObject.getPath(),
                    firstPipesObject.getTransform(),
                    firstPipesObject.getWidth(),
                    firstPipesObject.getHeight(),
                    new Transform(
                        new Vector2D(
                            lastPipesObject.getCanvasPosition().getX() + random(500, 600),
                            random(200, 400)
                        )
                    ),
                    firstPipesObject.getCanvasWidth(),
                    firstPipesObject.getCanvasHeight()
                )
                newPipe.setSpeed(firstPipesObject.getSpeed())
                newPipe.setLayer(firstPipesObject.getLayer())
                newPipe.setActive(firstPipesObject.getIsActive())

                scene.addGameObject(newPipe)
                scene.removeGameObject(firstPipesObject)
            }
        }
    }
}

export default PipeManager

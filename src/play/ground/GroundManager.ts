import GameObjectManager from '../../engine/gameObject/GameObjectManager'
import Vector2D from '../../engine/components/Vector2D'
import Ground from './Ground'
import Transform from '../../engine/components/Transform'
import Scene from '../../engine/Scene'

class GroundManager extends GameObjectManager<Ground> {
    public setAllSpeed(speed: number): void {
        this.listOfGameObjects.forEach((gameObject) => gameObject.setSpeed(speed))
    }

    public findLastGround(scene: Scene): number {
        for (let i = scene.listOfGameObjects.length - 1; i >= 0; i--) {
            if (scene.listOfGameObjects[i] instanceof Ground) {
                return i
            }
        }
        return 0
    }

    public findFirstGround(scene: Scene): number {
        for (let i = 0; i < scene.listOfGameObjects.length; i++) {
            if (scene.listOfGameObjects[i] instanceof Ground) {
                return i
            }
        }
        return 0
    }

    public update(deltaTime: number, scene?: Scene): void {
        if (scene) {
            const lastIndex = this.findLastGround(scene)
            const firstIndex = this.findFirstGround(scene)

            const firstGroundObject: Ground = scene.listOfGameObjects[firstIndex] as Ground
            const lastGroundObject: Ground = scene.listOfGameObjects[lastIndex] as Ground

            if (
                firstGroundObject.getCanvasPosition().getX() + firstGroundObject.getCanvasWidth() <=
                0
            ) {
                this.listOfGameObjects.splice(0, 1)
                const newGround = new Ground(
                    firstGroundObject.getPath(),
                    firstGroundObject.getTransform(),
                    firstGroundObject.getWidth(),
                    firstGroundObject.getHeight(),
                    new Transform(
                        new Vector2D(
                            lastGroundObject.getCanvasPosition().getX() +
                                firstGroundObject.getCanvasWidth(),
                            510 - firstGroundObject.getCanvasHeight()
                        )
                    ),
                    firstGroundObject.getCanvasWidth(),
                    firstGroundObject.getCanvasHeight()
                )
                newGround.setSpeed(firstGroundObject.getSpeed())
                newGround.setLayer(firstGroundObject.getLayer())

                this.listOfGameObjects.push(newGround)
                scene.addGameObject(newGround)
                scene.removeGameObject(firstGroundObject)
            }
        }
    }

    public destroy(): void {
        this.listOfGameObjects.forEach((ground) => ground.destroy())
    }
}

export default GroundManager

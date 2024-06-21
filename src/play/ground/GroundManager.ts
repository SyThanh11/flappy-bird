import GameObjectManager from '../../engine/gameObject/GameObjectManager'
import Vector2D from '../../engine/components/Vector2D'
import Ground from './Ground'
import Transform from '../../engine/components/Transform'
import Scene from '../../engine/scene/Scene'
import SceneManager from '../../engine/scene/SceneManager'

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

    public update(deltaTime: number): void {
        const lastIndex = this.findLastGround(SceneManager.getInstance().getScene('gamePlay'))
        const firstIndex = this.findFirstGround(SceneManager.getInstance().getScene('gamePlay'))

        const firstGroundObject: Ground = SceneManager.getInstance().getScene('gamePlay')
            .listOfGameObjects[firstIndex] as Ground
        const lastGroundObject: Ground = SceneManager.getInstance().getScene('gamePlay')
            .listOfGameObjects[lastIndex] as Ground

        if (
            firstGroundObject.getCanvasPosition().getX() + firstGroundObject.getCanvasWidth() <=
            0
        ) {
            this.listOfGameObjects.splice(0, 1)
            const newGround = new Ground(
                firstGroundObject.getImage(),
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
            SceneManager.getInstance().getScene('gamePlay').addGameObject(newGround)
            SceneManager.getInstance().getScene('gamePlay').removeGameObject(firstGroundObject)
        }
    }

    public destroy(): void {
        this.listOfGameObjects.forEach((ground) => ground.destroy())
    }
}

export default GroundManager

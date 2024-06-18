import GameObjectManager from '../../engine/gameObject/GameObjectManager'
import Background from './Background'

class BackgroundManager extends GameObjectManager<Background> {
    public update(deltaTime: number): void {}
}

export default BackgroundManager

import Transform from '../components/Transform'
import GameObject from './GameObject'
import GameObjectManager from './GameObjectManager'

class GameContainer extends GameObject {
    private listOfGameObjects: GameObjectManager<GameObject>[]

    constructor() {
        super(new Image(), new Transform(), 0, 0, new Transform(), 0, 0)

        this.listOfGameObjects = []
    }

    public update(deltaTime: number): void {
        this.listOfGameObjects.forEach((gameObjectManager: GameObjectManager<GameObject>) => {
            gameObjectManager.update(deltaTime)
        })
    }

    public addToContainer(gameObject: GameObjectManager<GameObject>): void {
        this.listOfGameObjects.push(gameObject)
    }
}

export default GameContainer

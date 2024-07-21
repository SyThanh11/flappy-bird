import GameContainer from '../../engine/gameObject/GameContainer'
import Scene from '../../engine/scene/Scene'
import GroundManager from '../ground/GroundManager'
import PipeManager from '../obstacles/PipeManager'

class ObjectManager extends GameContainer {
    private listOfGrounds: GroundManager
    private listOfPipes: PipeManager

    constructor() {
        super()
    }

    public setGameManager(listOfGrounds: GroundManager, listOfPipes: PipeManager): void {
        this.listOfGrounds = listOfGrounds
        this.listOfPipes = listOfPipes

        this.addToContainer(this.listOfGrounds)
        this.addToContainer(this.listOfPipes)
    }

    public getListOfGrounds(): GroundManager {
        return this.listOfGrounds
    }

    public getListOfPipes(): PipeManager {
        return this.listOfPipes
    }

    public addToScene(scene: Scene): void {
        scene.addGameObject(this)
    }
}

export default ObjectManager

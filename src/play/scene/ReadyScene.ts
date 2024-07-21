import Scene from '../../engine/scene/Scene'
import SceneManager from '../../engine/scene/SceneManager'
import BirdBuilder from '../bird/BirdBuilder'
import BackgroundManagerBuilder from '../background/BackgroundManagerBuilder'
import GroundManagerBuilder from '../ground/GroundManagerBuilder'
import MessageBuilder from '../message/MessageBuilder'

class ReadyScene extends Scene {
    constructor() {
        super()

        this.createObjects()
    }

    public createObjects(): void {
        // Constructor
        const birdBuilder = new BirdBuilder()
        const listOfBackgroundsBuilder = new BackgroundManagerBuilder()
        const listOfGroundsBuilder = new GroundManagerBuilder()
        const messageBuilder = new MessageBuilder()

        // Add to scene
        birdBuilder.addToScene(this)
        listOfBackgroundsBuilder.addToScene(this)
        listOfGroundsBuilder.addToScene(this)
        messageBuilder.addToScene(this)

        // Set Layer
        birdBuilder.build().setLayer(2)
        listOfBackgroundsBuilder.build().setAllLayer(0)
        listOfGroundsBuilder.build().setAllLayer(2)
        messageBuilder.build().setLayer(3)

        // set up
        birdBuilder.build().destroy()
        listOfGroundsBuilder.build().setAllSpeed(0)
    }

    public update(deltaTime: number): void {
        super.update(deltaTime)
    }

    public handleInput(event: Event): void {
        SceneManager.getInstance().getScene('gamePlay').setIsActive(true)
        SceneManager.getInstance().getScene('ready').setIsActive(false)
    }
}

export default ReadyScene

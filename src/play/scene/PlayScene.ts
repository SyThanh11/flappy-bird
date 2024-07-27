import MouseEventHandler from '../../engine/controller/MouseEventHandler'
import Scene from '../../engine/scene/Scene'
import SceneManager from '../../engine/scene/SceneManager'
import Bird from '../bird/Bird'
import BirdBuilder from '../bird/BirdBuilder'
import BackgroundManagerBuilder from '../background/BackgroundManagerBuilder'
import ObjectManager from '../gameContainer/ObjectManager'
import MiddleGameObject from '../gameContainer/ObjectManager'
import Ground from '../ground/Ground'
import GroundManagerBuilder from '../ground/GroundManagerBuilder'
import Pipe from '../obstacles/Pipe'
import PipeManagerBuilder from '../obstacles/PipeManagerBuilder'
import Score from '../score/Score'
import ScoreBuilder from '../score/ScoreBuilder'

class PlayScene extends Scene {
    private scoreBuilder: ScoreBuilder
    private listOfBackgroundsBuilder: BackgroundManagerBuilder

    constructor() {
        super()
    }

    public create(): void {
        // Constructor
        const birdBuilder = new BirdBuilder()
        this.listOfBackgroundsBuilder = new BackgroundManagerBuilder()
        const listOfGroundsBuilder = new GroundManagerBuilder()
        const listOfPipesBuilder = new PipeManagerBuilder()
        this.scoreBuilder = new ScoreBuilder()

        const objectContainer = new ObjectManager()
        objectContainer.setGameManager(listOfGroundsBuilder.build(), listOfPipesBuilder.build())

        // Add to scene
        birdBuilder.addToScene(this)
        this.listOfBackgroundsBuilder.addToScene(this)
        listOfGroundsBuilder.addToScene(this)
        listOfPipesBuilder.addToScene(this)
        objectContainer.addToScene(this)
        this.scoreBuilder.addToScene(this)

        // Set Layer
        birdBuilder.build().setLayer(2)
        this.listOfBackgroundsBuilder.build().setAllLayer(0)
        listOfGroundsBuilder.build().setAllLayer(2)
        listOfPipesBuilder.build().setAllLayer(1)
        this.scoreBuilder.build().setLayer(2)

        // Add to InputHandler
        MouseEventHandler.getInstance().addObject(birdBuilder.build())
    }

    public update(deltaTime: number): void {
        if (!this.checkCollision()) {
            super.update(deltaTime)
            this.calculateScore()
        } else {
            localStorage.setItem('SCORE', String(this.scoreBuilder.build().getScore()))
            SceneManager.getInstance().getScene('gameOver').setIsActive(true)
            this.removeScore()
        }
    }

    private checkCollision(): boolean {
        for (let i = 0; i < this.getListOfGameObjects().length - 1; i++) {
            const obj1 = this.getListOfGameObjects()[i]

            for (let j = i + 1; j < this.getListOfGameObjects().length; j++) {
                const obj2 = this.getListOfGameObjects()[j]

                if (obj1 instanceof Bird && obj2 instanceof Ground) {
                    if (obj1.getCollider().isColliding(obj2.getCollider())) return true
                } else if (obj1 instanceof Ground && obj2 instanceof Bird) {
                    if (obj2.getCollider().isColliding(obj1.getCollider())) return true
                }

                if (obj1 instanceof Bird && obj2 instanceof Pipe) {
                    if (obj1.getCollider().isColliding(obj2.getCollider())) return true
                } else if (obj1 instanceof Pipe && obj2 instanceof Bird) {
                    if (obj2.getCollider().isColliding(obj1.getCollider())) return true
                }

                if (obj1 instanceof Bird) {
                    if (obj1.getCollider().getPosition().getY() < -obj1.getCanvasHeight())
                        return true
                }
            }
        }
        return false
    }

    private calculateScore(): void {
        let middleGameObject: MiddleGameObject | undefined
        let score: Score | undefined
        let bird: Bird | undefined

        for (let i = 0; i < this.getListOfGameObjects().length; i++) {
            const obj = this.getListOfGameObjects()[i]
            if (obj instanceof MiddleGameObject) {
                middleGameObject = obj as MiddleGameObject
            } else if (obj instanceof Score) {
                score = obj
            } else if (obj instanceof Bird) {
                bird = obj
            }
        }

        if (middleGameObject) {
            if (middleGameObject.getListOfPipes().getIsDestroyed()) {
                score?.setIsScore(true)
            }

            const firstGroundObject =
                this.getListOfGameObjects()[middleGameObject.getListOfPipes().findFirstPipes(this)]

            if (
                score &&
                bird &&
                score.getIsScore() &&
                bird.getCanvasPosition().getX() >
                    firstGroundObject.getCanvasPosition().getX() +
                        firstGroundObject.getCanvasWidth()
            ) {
                score.setScore(score.getScore() + 1)
                score.setIsScore(false)
                middleGameObject.getListOfPipes().setIsDestroyed(false)
            }
        }
    }

    private removeScore() {
        for (let i = 0; i < this.getListOfGameObjects().length; i++) {
            const obj = this.getListOfGameObjects()[i]
            if (obj instanceof Score) {
                this.getListOfGameObjects().splice(i, 1)
            }
        }
    }
}

export default PlayScene

import MouseEventHandler from '../../engine/controller/MouseEventHandler'
import Scene from '../../engine/scene/Scene'
import SceneManager from '../../engine/scene/SceneManager'
import Bird from '../Bird/Bird'
import BirdBuilder from '../Bird/BirdBuilder'
import BackgroundManagerBuilder from '../background/BackgroundManagerBuilder'
import MiddleGameObject from '../game-manager-handler/MiddleGameObject'
import Ground from '../ground/Ground'
import GroundManagerBuilder from '../ground/GroundManagerBuilder'
import Pipe from '../obstacles/Pipe'
import PipeManagerBuilder from '../obstacles/PipeManagerBuilder'
import Score from '../score/Score'
import ScoreBuilder from '../score/ScoreBuilder'

class PlayScene extends Scene {
    private scoreBuilder: ScoreBuilder

    constructor() {
        super()

        this.createObjects()
    }

    public createObjects(): void {
        // Constructor
        const birdBuilder = new BirdBuilder()
        const listOfBackgroundsBuilder = new BackgroundManagerBuilder()
        const listOfGroundsBuilder = new GroundManagerBuilder()
        const listOfPipesBuilder = new PipeManagerBuilder()
        this.scoreBuilder = new ScoreBuilder()

        const middleGameObject = new MiddleGameObject()
        middleGameObject.setGameManager(listOfGroundsBuilder.build(), listOfPipesBuilder.build())

        // Add to scene
        birdBuilder.addToScene(this)
        listOfBackgroundsBuilder.addToScene(this)
        listOfGroundsBuilder.addToScene(this)
        listOfPipesBuilder.addToScene(this)
        middleGameObject.addToScene(this)
        this.scoreBuilder.addToScene(this)

        // Set Layer
        birdBuilder.build().setLayer(2)
        listOfBackgroundsBuilder.build().setAllLayer(0)
        listOfGroundsBuilder.build().setAllLayer(2)
        listOfPipesBuilder.build().setAllLayer(1)
        this.scoreBuilder.build().setLayer(2)

        // Add to InputHandler
        MouseEventHandler.getInstance().addObject(birdBuilder.build())
    }

    public update(deltaTime: number): void {
        if (!this.checkCollision()) {
            super.update(deltaTime)
            this.caculateScore()
        } else {
            localStorage.setItem("SCORE", String(this.scoreBuilder.build().getScore()))
            SceneManager.getInstance().getScene('gameOver').setIsActive(true)
            this.removeScore()
        }
    }

    private checkCollision(): boolean {
        for (let i = 0; i < this.listOfGameObjects.length - 1; i++) {
            const obj1 = this.listOfGameObjects[i]

            for (let j = i + 1; j < this.listOfGameObjects.length; j++) {
                const obj2 = this.listOfGameObjects[j]

                if (obj1 instanceof Bird && obj2 instanceof Ground) {
                    if (obj1.getCollider().isColliding(obj2.getCollider())) return true
                } else if (obj1 instanceof Ground && obj2 instanceof Bird) {
                    if (obj1.getCollider().isColliding(obj2.getCollider())) return true
                }

                if (obj1 instanceof Bird && obj2 instanceof Pipe) {
                    if (obj1.getCollider().isColliding(obj2.getCollider())) return true
                } else if (obj1 instanceof Pipe && obj2 instanceof Bird) {
                    if (obj1.getCollider().isColliding(obj2.getCollider())) return true
                }
            }
        }
        return false
    }

    private caculateScore(): void {
        let middleGameObject: MiddleGameObject | undefined
        let score: Score | undefined
        let bird: Bird | undefined

        for (let i = 0; i < this.listOfGameObjects.length; i++) {
            const obj = this.listOfGameObjects[i]
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
                this.listOfGameObjects[middleGameObject.getListOfPipes().findFirstPipes(this)]

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

    private removeScore(){
        for(let i = 0; i < this.listOfGameObjects.length; i++){
            const obj = this.listOfGameObjects[i]
            if(obj instanceof Score){
                this.listOfGameObjects.splice(i, 1)
            }
        }
    }
}

export default PlayScene

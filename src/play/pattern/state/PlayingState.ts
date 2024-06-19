import Bird from '../../Bird/Bird'
import GameState from '../../constant/GameState'
import listOfInputs from '../../constant/input'
import GameManager from '../../game-manager-handler/GameManager'
import Ground from '../../ground/Ground'
import Pipe from '../../obstacles/Pipe'


class PlayingState implements State {
    private gameManager: GameManager

    constructor(gameManager: GameManager) {
        this.gameManager = gameManager
    }

    handleInputEvent(): void {}

    update(deltaTime: number): void {
        this.gameManager.getListOfPipesBuilder().build().setAllLayer(1)
        this.gameManager.getScoreBuilder().build().setLayer(2)
        this.gameManager
            .getListOfGroundsBuilder()
            .build()
            .setAllSpeed(listOfInputs.listOfGroundsInfo.groundInfo.speed)
        this.gameManager
            .getListOfPipesBuilder()
            .build()
            .setAllSpeed(listOfInputs.listOfPipesInfo.pipeInfo.speed)

        if (this.checkCollision()) {
            this.gameManager.setGameState(GameState.GAMEOVER)
            this.gameManager.getBirdBuilder().build().setGameState(GameState.GAMEOVER)
            this.gameManager.getListOfGroundsBuilder().build().setAllSpeed(0)
            this.gameManager.getListOfPipesBuilder().build().setAllSpeed(0)
        } else {
            this.gameManager.getListOfGroundsBuilder().build().update(deltaTime)
            this.gameManager.getListOfPipesBuilder().build().update(deltaTime)
            this.caculateScore()
        }
    }

    checkCollision(): boolean {
        const { listOfGameObjects } = this.gameManager.getScene()

        for (let i = 0; i < listOfGameObjects.length - 1; i++) {
            const obj1 = listOfGameObjects[i]

            for (let j = i + 1; j < listOfGameObjects.length; j++) {
                const obj2 = listOfGameObjects[j]

                // Check collision between Bird and Ground
                if (obj1 instanceof Bird && obj2 instanceof Ground) {
                    if (obj1.collider.isColliding(obj2.collider)) return true
                } else if (obj1 instanceof Ground && obj2 instanceof Bird) {
                    if (obj1.collider.isColliding(obj2.collider)) return true
                }

                // Check collision between Bird and Pipe
                if (obj1 instanceof Bird && obj2 instanceof Pipe) {
                    if (obj1.collider.isColliding(obj2.collider)) return true
                } else if (obj1 instanceof Pipe && obj2 instanceof Bird) {
                    if (obj1.collider.isColliding(obj2.collider)) return true
                }
            }
        }
        return false
    }

    private caculateScore(): void {
        if (this.gameManager.getListOfPipesBuilder().build().getIsDestroyed()) {
            this.gameManager.getScoreBuilder().build().setIsScore(true)
        }

        const firstGroundObject =
            this.gameManager.getScene().listOfGameObjects[this.gameManager.getListOfPipesBuilder().build().findFirstPipes(this.gameManager.getScene())]

        if (
            this.gameManager.getScoreBuilder().build().getIsScore() &&
            this.gameManager.getBirdBuilder().build().getCanvasPosition().getX() >
                firstGroundObject.getCanvasPosition().getX() + firstGroundObject.getCanvasWidth()
        ) {
            this.gameManager.getScoreBuilder().build().setScore(this.gameManager.getScoreBuilder().build().getScore() + 1)
            this.gameManager.getScoreBuilder().build().setIsScore(false)
            this.gameManager.getListOfPipesBuilder().build().setIsDestroyed(false)
        }
    }
}

export default PlayingState

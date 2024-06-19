import GameState from '../../constant/GameState'
import GameManager from '../../play/game-manager-handler/GameManager'

class GameOverState implements State {
    private gameManager: GameManager

    constructor(gameManager: GameManager) {
        this.gameManager = gameManager
    }

    handleInputEvent(): void {}

    update(deltaTime: number): void {
        const isMousePressed = this.gameManager.getMouseEventHandler().isMousePressed()
        this.gameManager.getGameOverMessageBuilder().build().setLayer(5)
        this.gameManager.getBoardBuilder().build().setLayer(5)
        this.gameManager.getButtonBuilder().build().setLayer(5)
        // this.gameManager.getListOfPipesBuilder().build().setAllSpeed(0)
        if (isMousePressed && this.gameManager.getButtonBuilder().build().getIsClicked()) {
            this.gameManager.setGameState(GameState.PLAYING)
            this.gameManager.getBirdBuilder().build().setGameState(GameState.PLAYING)
            this.gameManager.init()
            this.gameManager.getButtonBuilder().build().setIsClicked(false)
        }
    }
}

export default GameOverState

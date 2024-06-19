import GameState from "../../constant/GameState";
import GameManager from "../../game-manager-handler/GameManager";

class ReadyState implements State {
    private gameManager: GameManager;

    constructor(gameManager: GameManager) {
        this.gameManager = gameManager;
    }

    handleInputEvent(): void {}

    update(deltaTime: number): void {
        const isMousePressed = this.gameManager.getMouseEventHandler().isMousePressed();
        
        this.gameManager.getListOfGroundsBuilder().build().setAllSpeed(0)
        this.gameManager.getListOfPipesBuilder().build().setAllSpeed(0)
        if (isMousePressed && this.gameManager.getButtonBuilder().build().getIsClicked()) {
            this.gameManager.setGameState(GameState.START)
            this.gameManager.getBirdBuilder().build().setGameState(GameState.START)
        }
    }
}

export default ReadyState;
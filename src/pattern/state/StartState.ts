import GameState from "../../constant/GameState";
import GameManager from "../../play/game-manager-handler/GameManager";

class StartState implements State {
    private gameManager: GameManager;

    constructor(gameManager: GameManager) {
        this.gameManager = gameManager;
    }

    handleInputEvent(): void {}

    update(deltaTime: number): void {
        const isMousePressed = this.gameManager.getMouseEventHandler().isMousePressed();
        this.gameManager.getMessageBuilder().build().setLayer(2);
        this.gameManager.getListOfGroundsBuilder().build().setAllSpeed(0)
        this.gameManager.getListOfPipesBuilder().build().setAllSpeed(0)
        if (isMousePressed) {
            this.gameManager.getScene().removeGameObject(this.gameManager.getMessageBuilder().build())
            this.gameManager.setGameState(GameState.PLAYING)
            this.gameManager.getBirdBuilder().build().setGameState(GameState.PLAYING)
        }
    }
}
  
export default StartState;
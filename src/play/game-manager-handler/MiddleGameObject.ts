import Scene from "../../engine/Scene";
import GameObject from "../../engine/gameObject/GameObject";
import GameManager from "./GameManager";


class MiddleGameObject extends GameObject {
    private gameManager: GameManager

    public start(): void {}
    public draw(): void {}
    public update(deltaTime: number): void {
        this.gameManager.update(deltaTime)
    }
    public destroy(): void {}

    public setGameManager(gameManager: GameManager): void {
        this.gameManager = gameManager
    }

    public addToScene(scence: Scene): void {
        scence.addGameObject(this)
    }

}

export default MiddleGameObject;
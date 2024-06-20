import Transform from "../../engine/components/Transform";
import Vector2D from "../../engine/components/Vector2D";
import ResourceManager from "../../engine/controller/ResourceManager";
import Scene from "../../engine/scene/Scene";
import listOfInputs from "../constant/input";
import ObjectBuilder from "../pattern/builder/ObjectBuilder";
import Board from "./Board";

class BoardBuilder implements ObjectBuilder {
    private board: Board;

    constructor() {
        this.board = new Board(
            ResourceManager.getInstance().getImage(17),
            listOfInputs.boardInfo.position,
            listOfInputs.boardInfo.width,
            listOfInputs.boardInfo.height,
            new Transform(
                new Vector2D(
                    (800 - listOfInputs.boardInfo.canvasWidth) / 2,
                    listOfInputs.boardInfo.canvasHeight + listOfInputs.boardInfo.dY
                )
            ),
            listOfInputs.boardInfo.canvasWidth,
            listOfInputs.boardInfo.canvasHeight,
        );
    }

    public build(): Board {
        return this.board;
    }

    public addToScene(scene: Scene): void{
        scene.addGameObject(this.board);
    }
}

export default BoardBuilder;
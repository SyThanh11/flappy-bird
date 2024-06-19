import listOfInputs from "../../constant/input";
import Scene from "../../engine/Scene";
import Transform from "../../engine/components/Transform";
import Vector2D from "../../engine/components/Vector2D";
import CanvasView from "../../engine/view/CanvasView";
import ObjectBuilder from "../../pattern/builder/ObjectBuilder";
import Board from "./Board";

class BoardBuilder implements ObjectBuilder {
    private board: Board;

    constructor(view: CanvasView) {
        this.board = this.board = new Board(
            listOfInputs.boardInfo.path,
            listOfInputs.boardInfo.position,
            listOfInputs.boardInfo.width,
            listOfInputs.boardInfo.height,
            new Transform(
                new Vector2D(
                    (view.getCanvas().width - listOfInputs.boardInfo.canvasWidth) / 2,
                    listOfInputs.boardInfo.canvasHeight + listOfInputs.boardInfo.dY
                )
            ),
            listOfInputs.boardInfo.canvasWidth,
            listOfInputs.boardInfo.canvasHeight
        );
    }

    public build(): Board {
        return this.board;
    }

    public addToScene(scene: Scene): void {
        scene.addGameObject(this.board);
    }
}

export default BoardBuilder;
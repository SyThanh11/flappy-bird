import Vector2D from "../../engine/components/Vector2D";
import Scene from "../../engine/scene/Scene";
import listOfInputs from "../constant/input";
import ObjectBuilder from "../pattern/builder/ObjectBuilder";
import Score from "./Score";

class ScoreBuilder implements ObjectBuilder {
    private score: Score;

    constructor() {

        this.score = new Score(
            new Image(),
            listOfInputs.scoreInfo.position,
            listOfInputs.scoreInfo.width,
            listOfInputs.scoreInfo.height,
            listOfInputs.scoreInfo.canvasPosition,
            listOfInputs.scoreInfo.canvasWidth,
            listOfInputs.scoreInfo.canvasHeight,
            new Vector2D(800 / 2, 510 / 20)
        );
    }

    public build(): Score {
        return this.score;
    }

    public addToScene(scene: Scene): void {
        scene.addGameObject(this.score);
    }
}

export default ScoreBuilder;
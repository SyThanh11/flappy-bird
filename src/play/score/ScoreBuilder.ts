import listOfInputs from "../constant/input";
import ObjectBuilder from "../pattern/builder/ObjectBuilder";
import Score from "./Score";

class ScoreBuilder implements ObjectBuilder {
    private score: Score;

    constructor() {
        this.score = new Score(
            listOfInputs.scoreInfo.path,
            listOfInputs.scoreInfo.position,
            listOfInputs.scoreInfo.width,
            listOfInputs.scoreInfo.height,
            listOfInputs.scoreInfo.canvasPosition,
            listOfInputs.scoreInfo.canvasWidth,
            listOfInputs.scoreInfo.canvasHeight,
            true
        );
    }

    public build(): Score {
        return this.score;
    }
}

export default ScoreBuilder;
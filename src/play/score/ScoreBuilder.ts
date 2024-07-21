import Vector2D from '../../engine/components/Vector2D'
import Scene from '../../engine/scene/Scene'
import listOfInputs from '../constant/input'
import ObjectBuilder from '../pattern/builder/ObjectBuilder'
import Score from './Score'

class ScoreBuilder implements ObjectBuilder {
    private score: Score

    constructor() {
        this.score = new Score(
            new Image(),
            listOfInputs.SCORE_INFO.POSITION,
            listOfInputs.SCORE_INFO.WIDTH,
            listOfInputs.SCORE_INFO.HEIGHT,
            listOfInputs.SCORE_INFO.CANVAS_POSITION,
            listOfInputs.SCORE_INFO.CANVAS_WIDTH,
            listOfInputs.SCORE_INFO.CANVAS_HEIGHT,
            new Vector2D(800 / 2, 510 / 20)
        )
    }

    public build(): Score {
        return this.score
    }

    public addToScene(scene: Scene): void {
        scene.addGameObject(this.score)
    }
}

export default ScoreBuilder

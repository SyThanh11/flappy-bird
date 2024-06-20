import Transform from '../../engine/components/Transform'
import Vector2D from '../../engine/components/Vector2D'
import Text from '../../engine/gameObject/Text'
import Scene from '../../engine/scene/Scene'

class Score extends Text {
    private isScore = true
    private score = 0

    constructor(
        image: HTMLImageElement,
        transform: Transform,
        width: number,
        height: number,
        canvasTransform: Transform,
        canvasWidth: number,
        canvasHeight: number,
        positionOffset: Vector2D
    ) {
        super(
            image,
            transform,
            width,
            height,
            canvasTransform,
            canvasWidth,
            canvasHeight,
            positionOffset
        )
        this.isScore = true
        this.score = 0
        this.setContent(String(this.score))
    }

    public setScore(score: number) {
        this.score = score
        this.setContent(String(this.score))
    }

    public getScore(): number {
        return this.score
    }

    public setIsScore(isScore: boolean) {
        this.isScore = isScore
    }

    public getIsScore(): boolean {
        return this.isScore
    }

    public addToScene(scene: Scene): void {
        scene.addGameObject(this)
    }
}

export default Score

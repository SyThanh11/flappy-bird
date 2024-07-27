import Transform from '../../engine/components/Transform'
import Vector2D from '../../engine/components/Vector2D'
import ResourceManager from '../../engine/controller/ResourceManager'
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

    public setContent(content: string): void {
        this.content = content
        this.loadImage()
    }

    public loadImage() {
        if (!this.content || this.content.length === 0) return

        for (let i = 0; i < this.content.length; i++) {
            const char = this.content.charAt(i)

            if (
                !this.resultImages.has(char) &&
                ResourceManager.getInstance().getMapImage().has(char)
            ) {
                const image = ResourceManager.getInstance().getMapImage().get(char)
                if (image instanceof HTMLImageElement) {
                    this.resultImages.set(char, image)
                } else {
                    console.warn(
                        `Image for character '${char}' is not an instance of HTMLImageElement.`
                    )
                }
            }
        }
    }
}

export default Score

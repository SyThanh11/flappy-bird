import Transform from "../../engine/components/Transform";
import Text from "../../engine/gameObject/Text";

class Score extends Text {
    private isScore = true;
    private score = 0;

    constructor(
        path: string,
        transform: Transform,
        width: number,
        height: number,
        canvasTransform: Transform,
        canvasWidth: number,
        canvasHeight: number,
        isStatic: boolean
    ) {
        super(path, transform, width, height, canvasTransform, canvasWidth, canvasHeight, isStatic);
        this.isScore = true;
        this.score = 0;
        this.setContent(String(this.score))
    }

    public setScore(score: number) {
        this.score = score;
        this.setContent(String(this.score))
    }

    public getScore(): number {
        return this.score;
    }

    public setIsScore(isScore: boolean) {
        this.isScore = isScore;
    }

    public getIsScore(): boolean {
        return this.isScore;
    }

    public start(): void {}
    public update(): void {}
    
}

export default Score

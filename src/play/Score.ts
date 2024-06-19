class Score {
    private score: number = 0
    // private bestScore: number
    private isScore: boolean = true;

    constructor() {}

    // getter
    public getScore(): number {
        return this.score
    }
    public getIsScore(): boolean {
        return this.isScore
    }

    // setter
    public setScore(score: number): void {
        this.score = score
    }
    public setIsScore(isScore: boolean): void {
        this.isScore = isScore
    }

    // draw
    public draw(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, gameState: string): void {
        if (gameState == 'PLAYING') {
            context.lineWidth = 2
            context.font = '40px Teko'
            context.fillStyle = 'white'
            context.fillText(String(this.score), canvas.width / 2, 50)
            context.strokeText(String(this.score), canvas.width / 2, 50)
        } 
    }

    // reset
    public reset(): void {
        this.score = 0
        this.isScore = true
    }
}

export default Score

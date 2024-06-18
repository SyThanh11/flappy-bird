class Score {
    private score: number = 0
    private bestScore: number
    private isScore: boolean = true;

    constructor() {
        const storedBestScore = localStorage.getItem('BEST')
        if (storedBestScore !== null) {
            this.bestScore = parseInt(storedBestScore)
        } else {
            this.bestScore = 0
        }
    }

    // getter
    public getScore(): number {
        return this.score
    }
    public getBestScore(): number {
        return this.bestScore
    }
    public getIsScore(): boolean {
        return this.isScore
    }

    // setter
    public setScore(score: number): void {
        this.score = score
    }
    public setBestScore(bestScore: number): void {
        this.bestScore = bestScore
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
        } else if(gameState == 'GAMEOVER') {
            context.lineWidth = 2
            context.font = "30px Teko";
            context.fillText(String(this.score), 225*2.15, 212);
            // BEST SCORE
            context.fillText(String(this.bestScore), 225*2.15, 267);
        }
    }

    // reset
    public reset(): void {
        this.score = 0
        this.isScore = true
    }
}

export default Score

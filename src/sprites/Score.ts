class Score {
    private score: number = 0
    private bestScore: number
    private gameState: string
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
    public getGameState(): string {
        return this.gameState
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
    public setGameState(gameState: string): void {
        this.gameState = gameState
    }
    public setIsScore(isScore: boolean): void {
        this.isScore = isScore
    }

    // draw
    public draw(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
        if (this.gameState == 'play') {
            context.lineWidth = 2
            context.font = '40px Teko'
            context.fillStyle = 'white'
            context.fillText(String(this.score), canvas.width / 2, 50)
            context.strokeText(String(this.score), canvas.width / 2, 50)
        }
    }
}

export default Score

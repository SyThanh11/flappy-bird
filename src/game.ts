import GameManager from './play/game-manager-handler/GameManager'

class Game {
    constructor() {
        this.createCanvas()
        new GameManager()
    }

    public createCanvas(): void {
        const canvas = <HTMLCanvasElement>document.createElement('canvas')
        canvas.setAttribute('id', 'canvas')
        canvas.height = 510
        canvas.width = 800

        canvas.style.background = 'white'

        document.body.appendChild(canvas)
    }

   
}

new Game()

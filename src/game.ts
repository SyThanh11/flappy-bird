import Background from './sprites/Background'
import Bird from './sprites/Bird'
import Ground from './sprites/Ground'
import Message from './sprites/Message'
import Pipe from './sprites/Pipe'
import Vector2D from './sprites/Vector2D'
import CanvasView from './view/CanvasView'

class Game {
    private gameState: string = 'start'
    private lastTime: number = 0
    private deltaTime: number = 0

    constructor() {
        console.log('Game created')
        this.createCanvas()
        let view = new CanvasView('canvas')
        let listGround: Ground[] = view.createListGround()
        let listBackground: Background[] = view.createListBackground()
        let bird: Bird = new Bird('../../assets/images/yellowbird-downflap.png', new Vector2D(view.getCanvas().width/4, (view.getCanvas().height-24)/2), 0, 0, 0, 9.8 , 60)
        let pipe: Pipe[] = view.createListPipes(4)
        let message: Message = new Message(
            '../assets/images/message.png',
            new Vector2D(0, 0),
            184,
            267,
            new Vector2D((view.getCanvas().width - 184) / 2, (view.getCanvas().height - 350) / 2),
            184,
            267
        )

        this.lastTime = window.performance.now()
        requestAnimationFrame(() =>
            this.gameLoop(view, listGround, listBackground, bird, pipe, message)
        )
    }

    public createCanvas(): void {
        const canvas = <HTMLCanvasElement>document.createElement('canvas')
        canvas.setAttribute('id', 'canvas')
        canvas.height = 510
        canvas.width = 800
        canvas.style.background = 'blue'
        document.body.appendChild(canvas)
    }

    // initial State
    public initState = (): void => {
        this.createCanvas()
    }

    // ProcessInput
    public processInput = (): void => {
        document.addEventListener('click', () => {
            if (this.gameState == 'start') {
                this.gameState = 'play'
                console.log('play')
            }
        })
    }

    // Draw
    public draw = (
        view: CanvasView,
        listGround: Ground[],
        listBackground: Background[],
        bird: Bird,
        pipe: Pipe[],
        message: Message
    ): void => {
        view.clear()
        view.drawListBackground(listBackground)
        view.drawListGround(listGround)
        if (this.gameState != 'play') {
            view.drawMessage(message)
        }
        view.drawBird(bird)
        view.drawListOfPipes(pipe)
    }

    // Update
    public update = (
        view: CanvasView,
        listGround: Ground[],
        listBackground: Background[],
        bird: Bird,
        pipe: Pipe[],
        deltaTime: number
    ): void => {
        bird.update(deltaTime);
        if (this.gameState == 'play') {
            view.updateListBackground(listBackground, deltaTime)
            view.updateListGround(listGround, deltaTime)
            view.updateListPipes(pipe, deltaTime)
        }
    }

    // Game Loop
    public gameLoop = (
        view: CanvasView,
        listGround: Ground[],
        listBackground: Background[],
        bird: Bird,
        pipe: Pipe[],
        message: Message
    ): void => {
        let currentTime = window.performance.now()
        this.deltaTime = (currentTime - this.lastTime) / 1000

        this.processInput()

        this.update(view, listGround, listBackground, bird, pipe, this.deltaTime)

        this.draw(view, listGround, listBackground, bird, pipe, message)

        this.lastTime = currentTime

        requestAnimationFrame(() =>
            this.gameLoop(view, listGround, listBackground, bird, pipe, message)
        )
    }
}

new Game()

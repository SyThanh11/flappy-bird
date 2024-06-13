import Background from './sprites/Background'
import Bird from './sprites/Bird'
import Ground from './sprites/Ground'
import Message from './sprites/Message'
import Pipe from './sprites/Pipe'
import Vector2D from './sprites/Vector2D'
import CanvasView from './view/CanvasView'

class Game {
    private lastTime: number = 0
    private deltaTime: number = 0

    private view: CanvasView
    private listGround: Ground[] = []
    private listBackground: Background[] = []
    private bird: Bird
    private pipe: Pipe[] = []
    private message: Message
    private score: number = 0
    private highScore: number = 0
    private gameState: string = 'start'

    constructor() {
        console.log('Game created')
        this.initState()

        this.lastTime = window.performance.now()
        requestAnimationFrame(() =>
            this.gameLoop(
                this.view,
                this.listGround,
                this.listBackground,
                this.bird,
                this.pipe,
                this.message
            )
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
        this.view = new CanvasView('canvas')
        this.listGround = this.view.createListGround()
        this.listBackground = this.view.createListBackground()
        this.bird = new Bird(
            '../../assets/images/yellowbird-downflap.png',
            new Vector2D(this.view.getCanvas().width / 4, (this.view.getCanvas().height - 24) / 2),
            0,
            0,
            0,
            9.8,
            60,
            this.gameState,
            this.view,
            this.pipe,
            false,
            0
        )
        this.pipe = this.view.createListPipes(4)
        this.message = new Message(
            '../assets/images/message.png',
            new Vector2D(0, 0),
            184,
            267,
            new Vector2D(
                (this.view.getCanvas().width - 184) / 2,
                (this.view.getCanvas().height - 350) / 2
            ),
            184,
            267
        )
        this.score = 0
        this.highScore = 0
        this.gameState = 'start'

        this.bird.setGameState(this.gameState);
        this.bird.setListOfPipes(this.pipe);
    }

    // ProcessInput
    public processInput = (): void => {
        document.addEventListener('click', () => {
            if (this.gameState == 'start') {
                this.gameState = 'play'
                this.bird.setGameState(this.gameState)
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
        if(this.gameState == 'start'){
            view.drawMessage(message)
        }
        view.drawListOfPipes(pipe) 
        view.drawListGround(listGround)
        view.drawBird(bird)
        
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
        this.bird.update(deltaTime)
        if (this.gameState == 'play') {
            if(this.bird.getEnd()){
                this.gameState = 'end'
            }

            view.updateListBackground(listBackground, deltaTime)
            view.updateListGround(listGround, deltaTime)
            view.updateListPipes(pipe, deltaTime)
            
            this.bird.setListOfPipes(this.pipe)
        } else if(this.gameState == 'end'){

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

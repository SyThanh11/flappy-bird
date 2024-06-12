import Background from './sprites/Background'
import Bird from './sprites/Bird';
import Ground from './sprites/Ground'
import Pipe from './sprites/Pipe';
import Vector2D from './sprites/Vector2D';
import CanvasView from './view/CanvasView'

class Game {
    private game: string = "start";

    private FPS: number = 60; 
    private gameSpeed: number = 1 / this.FPS; 
    private lastTime: number = 0;
    private deltaTime: number = 0;

    constructor() {
        console.log('Game created')
        this.createCanvas()
        let view = new CanvasView('canvas')
        let listGround: Ground[] = view.createListGround();
        let listBackground: Background[] = view.createListBackground();
        let bird: Bird = new Bird(new Vector2D(0, 0), new Vector2D(50,50), 100);
        let pipe: Pipe[] = view.createListPipes(4);
    
        this.gameLoop(view, listGround, listBackground, bird, pipe);
    }

    public createCanvas(): void {
        const canvas = <HTMLCanvasElement>document.createElement('canvas')
        canvas.setAttribute('id', 'canvas');
        canvas.height = 700; 
        canvas.width = 800
        document.body.appendChild(canvas)
    }

    // ProcessInput
    public processInput = (): void => {
        
        
    }

    // Draw
    public draw = (view: CanvasView, listGround: Ground[], listBackground: Background[], bird: Bird, pipe: Pipe[]): void => {
        view.clear();
        // view.drawListBackground(listBackground)
        // view.drawListGround(listGround)
        view.drawBird(bird)
        view.drawListOfPipes(pipe)

    }

    // Update
    // Fix the deltaTime to maintain stability
    private fixUpdate = (): void => {
        if (this.deltaTime < 0.03) {
            this.deltaTime = 0.03;
        }
    }

    public update = (view: CanvasView, listGround: Ground[], listBackground: Background[], bird: Bird, pipe: Pipe[] , deltaTime: number): void => {
        // if (this.game == "play"){
        //     view.updateListGround(listGround, deltaTime);
        //     view.updateListBackground(listBackground, deltaTime);
        // }
        view.updateBirdMove(bird, deltaTime);
        view.updateListPipes(pipe, deltaTime);

        bird.collidesWith(pipe);
    }

    // Game Loop
    public gameLoop = (view: CanvasView, listGround: Ground[], listBackground: Background[], bird: Bird, pipe: Pipe[]): void => {

        let currentTime = performance.now();
        this.deltaTime += (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;
        
        this.processInput();
        this.fixUpdate();
        
        while (this.deltaTime >= this.gameSpeed) {
            this.update(view, listGround, listBackground, bird, pipe ,this.deltaTime);
            this.deltaTime -= this.gameSpeed;
        }

        this.draw(view, listGround, listBackground, bird, pipe)
        

        requestAnimationFrame(() => this.gameLoop(view, listGround, listBackground, bird, pipe));
    }
}

new Game()

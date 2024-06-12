import Background from '../sprites/Background'
import Ground from '../sprites/Ground'
import Bird from '../sprites/Bird'
import Pipe from '../sprites/Pipe'
import Vector2D from '../sprites/Vector2D'
import KeyAccess from '../input/KeyAccess'
import { random } from '../helper/helper'

class CanvasView {
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D

    constructor(canvasName: string) {
        this.canvas = document.querySelector(canvasName) as HTMLCanvasElement
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    }

    clear = (): void => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    // Ground
    createListGround = (): Ground[] => {
        let listGround = []
        for (let i = 0; i < 3; i++) {
            listGround.push(
                new Ground(
                    '../assets/images/base.png',
                    { x: 0, y: 0 },
                    336,
                    112,
                    { x: i * 168, y: 400 },
                    336,
                    112,
                    { x: -2, y: 0 },
                    30
                )
            )
        }

        return listGround
    }

    drawGround = (ground: Ground): void => {
        if (!ground) return

        this.ctx.drawImage(
            ground.getImage(),
            ground.getPosition().x,
            ground.getPosition().y,
            ground.getWidth(),
            ground.getHeight(),
            ground.getCanvasPosition().x,
            ground.getCanvasPosition().y,
            ground.getCanvasWidth(),
            ground.getCanvasHeight()
        )
    }

    drawListGround = (listGround: Ground[]): void => {
        if (!listGround) return

        let dX = 0
        listGround.forEach((ground) => {
            this.drawGround(ground)
            dX += ground.getCanvasWidth()
        })
    }

    updateListGround = (listGround: Ground[], deltaTime: number): void => {
        if (!listGround) return

        listGround.forEach((ground) => {
            ground.setCanvasPosition({
                x:
                    ground.getCanvasPosition().x +
                    ground.getdPosition().x * ground.getGroundSpeed() * deltaTime,
                y:
                    ground.getCanvasPosition().y +
                    ground.getdPosition().y * ground.getGroundSpeed() * deltaTime,
            })
        })

        if (listGround[0].getCanvasPosition().x <= -168) {
            listGround.splice(0, 1)
            listGround.push(
                new Ground(
                    '../assets/images/base.png',
                    { x: 0, y: 0 },
                    336,
                    112,
                    { x: listGround[1].getCanvasPosition().x + 168, y: 400 },
                    336,
                    112,
                    { x: -2, y: 0 },
                    30
                )
            )
        }
    }

    // Background
    createListBackground = (): Background[] => {
        let listBackground = []
        for (let i = 0; i < 3; i++) {
            listBackground.push(
                new Background(
                    '../assets/images/background-night.png',
                    { x: 0, y: 0 },
                    288,
                    512,
                    { x: i * 168, y: 0 },
                    288,
                    512
                )
            )
        }

        return listBackground
    }

    drawBackground = (background: Background): void => {
        if (!background) return

        this.ctx.drawImage(
            background.getImage(),
            background.getPosition().x,
            background.getPosition().y,
            background.getWidth(),
            background.getHeight(),
            background.getCanvasPosition().x,
            background.getCanvasPosition().y,
            background.getCanvasWidth(),
            background.getCanvasHeight()
        )
    }

    drawListBackground = (listBackground: Background[]): void => {
        if (!listBackground) return

        let dX = 0
        listBackground.forEach((background) => {
            this.drawBackground(background)
            dX += background.getCanvasWidth()
        })
    }

    updateListBackground = (listBackground: Background[], deltaTime: number): void => {
        if (!listBackground) return

        listBackground.forEach((background) =>
            background.setImage('../assets/images/background-day.png')
        )
    }

    // Bird
    drawBird = (bird: Bird): void => {
        if (!bird) return

        this.ctx.fillStyle = "red";
        this.ctx.fillRect(
            bird.getPosition().getX(),
            bird.getPosition().getY(),
            bird.getSize().getX(),
            bird.getSize().getY()
        );
    }

    updateBirdMove = (bird: Bird, deltaTime: number): void => {
        bird.updateBird(deltaTime)
    }

    // Pipe
    drawPipe = (pipe: Pipe): void => {
        pipe.draw(this.ctx);
    }

    createListPipes = (pipeCount: number): Pipe[] => {
        let pipes: Pipe[] = []
        for (let i = 1; i < pipeCount; i++) {
            pipes.push(
                new Pipe(
                    {
                        position: new Vector2D(i * random(800, 850), random(-100, -50)),
                        size: new Vector2D(50, 200),
                        speed: 100,
                        space: 100
                    }
                )
            )
        }
        return pipes
    }

    drawListOfPipes(listOfPipes: Pipe[]): void {
        if(!listOfPipes) return;
        listOfPipes.forEach(pipe => pipe.draw(this.ctx));
    }

    updateListPipes = (listOfPipes: Pipe[], deltaTime: number): void => {
        if(!listOfPipes) return;
        listOfPipes.forEach(pipe => {
            pipe.update(deltaTime);
        })
        if (listOfPipes[0].getPosition().getX() < -82) {
            listOfPipes.splice(0, 1);
            listOfPipes.push(
                new Pipe(
                    {
                        position: new Vector2D(listOfPipes[listOfPipes.length - 1].getPosition().getX() + random(600, 700), random(-100, -50)),
                        size: new Vector2D(50, 200),
                        speed: 100,
                        space: random(100, 150)
                    }
                )
            )
        }
    }
}

export default CanvasView

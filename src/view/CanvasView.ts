import Background from '../sprites/Background'
import Ground from '../sprites/Ground'
import Bird from '../sprites/Bird'
import Pipe from '../sprites/Pipe'
import Vector2D from '../sprites/Vector2D'
import { random } from '../helper/helper'
import Message from '../sprites/Message'

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

    // getter
    getCanvas = (): HTMLCanvasElement => {
        return this.canvas
    }
    getCtx = (): CanvasRenderingContext2D => {
        return this.ctx
    }

    // Ground
    createListGround = (): Ground[] => {
        let listGround = []
        for (let i = 0; i < 4; i++) {
            listGround.push(
                new Ground(
                    '../assets/images/base.png',
                    new Vector2D(0, 0),
                    336,
                    112,
                    new Vector2D(336 * i, 510 - 112),
                    336,
                    112,
                    100
                )
            )
        }

        return listGround
    }

    drawListGround = (listGround: Ground[]): void => {
        if (!listGround) return

        listGround.forEach((ground) => {
            ground.draw(this.ctx)
        })
    }

    updateListGround = (listGround: Ground[], deltaTime: number): void => {
        if (!listGround) return

        listGround.forEach((ground) => {
            ground.update(deltaTime)
        })

        if (listGround[0].getCanvasPosition().getX() <= -336) {
            listGround.splice(0, 1)
            listGround.push(
                new Ground(
                    '../assets/images/base.png',
                    new Vector2D(0, 0),
                    336,
                    112,
                    new Vector2D(listGround[2].getCanvasPosition().getX() + 336, 510 - 112),
                    336,
                    112,
                    100
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
                    new Vector2D(0, 0),
                    288,
                    512,
                    new Vector2D(288 * i, 0),
                    288,
                    512
                )
            )
        }

        return listBackground
    }

    drawListBackground = (listBackground: Background[]): void => {
        if (!listBackground) return

        listBackground.forEach((background) => {
            background.draw(this.ctx)
        })
    }

    updateListBackground = (listBackground: Background[], deltaTime: number): void => {
        if (!listBackground) return

        listBackground.forEach((background) => background.update(deltaTime))
    }

    // Bird
    drawBird = (bird: Bird): void => {
        if (!bird) return

        bird.draw(this.ctx)
    }

    updateBirdMove = (bird: Bird, deltaTime: number): void => {
        bird.update(deltaTime)
    }

    // Pipe
    drawPipe = (pipe: Pipe): void => {
        pipe.draw(this.ctx)
    }

    createListPipes = (pipeCount: number): Pipe[] => {
        let pipes: Pipe[] = []
        for (let i = 1; i < pipeCount; i++) {
            pipes.push(
                new Pipe(
                    new Vector2D(i*random(800, 850), random(-200, -100)),
                    200,
                    70
                )
            )
        }
        return pipes
    }

    drawListOfPipes(listOfPipes: Pipe[]): void {
        if (!listOfPipes) return

        listOfPipes.forEach((pipe) => {
            pipe.draw(this.ctx)
        })
    }

    updateListPipes = (listOfPipes: Pipe[], deltaTime: number): void => {
        if (!listOfPipes) return
        listOfPipes.forEach((pipe) => {
            pipe.update(deltaTime)
        })
        if (listOfPipes[0].getCanvasPosition().getX() < -52) {
            listOfPipes.splice(0, 1)
            listOfPipes.push(
                new Pipe(
                    new Vector2D(
                        listOfPipes[listOfPipes.length - 1].getCanvasPosition().getX() + random(600, 700),
                        random(-200, -100)
                    ),
                    200,
                    random(100, 150)
                )
            )
        }
    } 

    // Message
    drawMessage(message: Message) {
        message.draw(this.ctx)
    }
}

export default CanvasView

import KeyAccess from '../input/KeyAccess'
import Physics from '../physics/Physics'
import CanvasView from '../view/CanvasView'
import GameObject from './GameObject'
import Pipe from './Pipe'
import Vector2D from './Vector2D'

const DEGREE = Math.PI / 180
const MAX_ROTATION_SPEED = 120

class Bird extends GameObject {
    constructor(
        path: string,
        canvasPosition: Vector2D,
        speed: number,
        private frame: number,
        private indexPath: number,
        private gravity: number,
        private jumpSpeed: number,
        private gameState: string,
        private view: CanvasView,
        private listOfPipes: Pipe[],
        private end: boolean,
        private rotation: number
    ) {
        super(path, new Vector2D(0, 0), 34, 24, canvasPosition, 34, 24, speed)
        this.frame = 0
        this.indexPath = 0
    }

    // setter
    public setFrame(frame: number): void {
        this.frame = frame
    }
    public setIndexPath(indexPath: number): void {
        this.indexPath = indexPath
    }
    public setGravity(gravity: number): void {
        this.gravity = gravity
    }
    public setJumpSpeed(jumpSpeed: number): void {
        this.jumpSpeed = jumpSpeed
    }
    public setGameState(gameState: string): void {
        this.gameState = gameState
    }
    public setView(view: CanvasView): void {
        this.view = view
    }
    public setListOfPipes(listOfPipes: Pipe[]): void {
        this.listOfPipes = listOfPipes
    }
    public setEnd(end: boolean): void {
        this.end = end
    }
    public setRotation(rotation: number): void {
        this.rotation = rotation
    }

    // getter
    public getFrame(): number {
        return this.frame
    }
    public getIndexPath(): number {
        return this.indexPath
    }
    public getGravity(): number {
        return this.gravity
    }
    public getJumpSpeed(): number {
        return this.jumpSpeed
    }
    public getGameState(): string {
        return this.gameState
    }
    public getView(): CanvasView {
        return this.view
    }
    public getListOfPipes(): Pipe[] {
        return this.listOfPipes
    }
    public getEnd(): boolean {
        return this.end
    }
    public getRotation(): number {
        return this.rotation
    }

    public draw(context: CanvasRenderingContext2D) {
        context.save()
        context.translate(
            this.gameObject.canvasPosition.getX(),
            this.gameObject.canvasPosition.getY()
        )
        context.rotate(this.rotation)

        context.drawImage(
            this.gameObject.image,
            this.gameObject.position.getX(),
            this.gameObject.position.getY(),
            this.gameObject.width,
            this.gameObject.height,
            -this.gameObject.canvasWidth / 2,
            -this.gameObject.canvasHeight / 2,
            this.gameObject.canvasWidth,
            this.gameObject.canvasHeight
        )

        context.restore()
    }

    public update(deltaTime: number) {
        this.frame++
        const path = [
            '../../assets/images/yellowbird-downflap.png',
            '../../assets/images/yellowbird-midflap.png',
            '../../assets/images/yellowbird-upflap.png',
        ]
        if (this.frame % 15 == 0) {
            this.indexPath++
            if (this.indexPath > 2) {
                this.indexPath = 0
            }
            this.setImage(path[this.indexPath])
        }

        // fall down

        if (this.gameState == 'start') {
            this.gameObject.canvasPosition.setY((this.view.getCanvas().height - 24) / 2)
            this.rotation = 0 * DEGREE
        } else if (this.gameState == 'play') {
            this.gameObject.speed += this.gravity
            this.gameObject.canvasPosition = this.gameObject.canvasPosition.add(
                new Vector2D(0, deltaTime * this.gameObject.speed)
            )

            if (this.gameObject.speed >= this.jumpSpeed) {
                const rotationSpeed = MAX_ROTATION_SPEED * deltaTime
                this.rotation += rotationSpeed * DEGREE
            } else {
                this.rotation = -25 * DEGREE
            }

            if (this.collidesWith(this.listOfPipes)) {
                this.end = true
                this.jumpSpeed = 0
                this.gameState = 'end'
            }
        }

        // jump
        if (KeyAccess.isKeyPressed(KeyAccess.SPACE)) {
            this.flap(deltaTime)
        }
    }

    public flap(deltaTime: number): void {
        const jumpDistance = this.jumpSpeed * deltaTime
        this.gameObject.canvasPosition = this.gameObject.canvasPosition.add(
            new Vector2D(0, -jumpDistance)
        )
        this.gameObject.speed = -this.jumpSpeed
    }

    // collision
    public collidesWith(listOfPipes: Pipe[]): boolean {
        let collides = false

        // collision with pipes
        if (
            this.gameObject.canvasPosition.getX() + this.gameObject.canvasWidth / 2 >=
                listOfPipes[0].getCanvasPosition().getX() &&
            this.gameObject.canvasPosition.getX() <
                listOfPipes[0].getCanvasPosition().getX() + listOfPipes[0].getWidth() &&
            (this.gameObject.canvasPosition.getY() <
                listOfPipes[0].getCanvasPosition().getY() + listOfPipes[0].getHeight() ||
                this.gameObject.canvasPosition.getY() + this.gameObject.canvasHeight / 2 >
                    listOfPipes[0].getCanvasPosition().getY() +
                        listOfPipes[0].getHeight() +
                        listOfPipes[0].getSpace())
        ) {
            collides = true
        }

        // collision with base
        if (
            this.gameObject.canvasPosition.getY() + this.gameObject.height / 2 >=
            this.view.getCanvas().height - 112
        ) {
            this.gameObject.canvasPosition.setY(
                this.view.getCanvas().height - 112 - this.gameObject.height / 2
            )
            collides = true
        }

        return collides
    }
}

export default Bird

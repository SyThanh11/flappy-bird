import KeyAccess from '../input/KeyAccess'
import CanvasView from '../view/CanvasView'
import GameObject from '../abstract/GameObject'
import Vector2D from './Vector2D'
import Transform from '../general/Transform'

class Bird extends GameObject {
    constructor(
        path: string,
        position: Vector2D,
        width: number,
        height: number,
        canvasPosition: Vector2D,
        canvasWidth: number,
        canvasHeight: number,
        speed: number,
        private frame: number,
        private gravity: number,
        private jumpSpeed: number,
        private transform: Transform,
        
    ) {
        super(path, position, width, height, canvasPosition, canvasWidth, canvasHeight, speed);
        this.frame = 0;
        this.transform = this.transform;
    }

    // setter
    public setFrame(frame: number): void {
        this.frame = frame
    }
    public setGravity(gravity: number): void {
        this.gravity = gravity
    }
    public setJumpSpeed(jumpSpeed: number): void {
        this.jumpSpeed = jumpSpeed
    }

    // getter
    public getFrame(): number {
        return this.frame
    }
    public getGravity(): number {
        return this.gravity
    }
    public getJumpSpeed(): number {
        return this.jumpSpeed
    }

    public draw(context: CanvasRenderingContext2D) {
        context.save()
        this.transform.rotateObject(this.gameObject, context)

        super.draw(context = context,undefined,undefined,undefined,undefined,new Vector2D(-this.gameObject.canvasWidth / 2, -this.gameObject.canvasHeight / 2))

        context.restore()
    }

    public update(deltaTime: number, gameState: string, view: CanvasView) {
        const path = [
            '../../assets/images/yellowbird-downflap.png',
            '../../assets/images/yellowbird-midflap.png',
            '../../assets/images/yellowbird-upflap.png',
        ]
        
        this.frame += deltaTime * 4;
        const frameIndex = Math.floor(this.frame) % path.length;
        this.setPath(path[frameIndex]);

        // fall down
        if (gameState == 'start') {
            this.gameObject.canvasPosition.setY((view.getCanvas().height - 24) / 2)
            this.transform.setRotation(0 * this.transform.getDegree()); 
        } else if (gameState == 'play') {
            this.gameObject.speed += this.gravity
            this.gameObject.canvasPosition = this.gameObject.canvasPosition.add(
                new Vector2D(0, deltaTime * this.gameObject.speed)
            )

            if (this.gameObject.speed >= this.jumpSpeed) {
                const rotationSpeed = this.transform.getMaxRotation() * deltaTime;
                this.transform.setRotation(this.transform.getRotation() +  rotationSpeed * this.transform.getDegree()); 
                // this.isFlap = true;
            } else {
                this.transform.setRotation(-25 * this.transform.getDegree());
                // this.isFlap = false; 
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

}

export default Bird

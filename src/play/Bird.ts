import Transform from '../engine/components/Transform'
import Image from '../engine/gameObject/Image'
import RigidBody from '../engine/components/RigidBody'
import MouseEventHandler from '../engine/controller/MouseEventHandler'
import Collider from '../engine/components/Collider'
import Sprite from '../engine/components/Sprite'
import { gameState } from '../constant/input'
import Vector2D from '../engine/components/Vector2D'

class Bird extends Image {
    public rigid: RigidBody | undefined
    // public collider: Collider
    private mouseEvent: MouseEventHandler = new MouseEventHandler('canvas')
    private sprite: Sprite = new Sprite()
    private gameState: string

    constructor(
        path: string,
        position: Transform,
        width: number,
        height: number,
        canvasPosition: Transform,
        canvasWidth: number,
        canvasHeight: number,
        private speed: number,
        private jumpSpeed: number
    ) {
        super(path, position, width, height, canvasPosition, canvasWidth, canvasHeight)
        this.collider = new Collider(
            this.getCanvasPosition(),
            this.getCanvasWidth(),
            this.getCanvasHeight()
        )
        this.initSpriteAnimation()
    }

    public setGameState(gameState: string): void {
        this.gameState = gameState
    }
    public setSpeed(speed: number): void {
        this.speed = speed
    }
    public setJumpSpeed(jumpSpeed: number): void {
        this.jumpSpeed = jumpSpeed
    }

    private initSpriteAnimation(): void {
        this.sprite.addPath('../../assets/images/yellowbird-downflap.png')
        this.sprite.addPath('../../assets/images/yellowbird-midflap.png')
        this.sprite.addPath('../../assets/images/yellowbird-upflap.png')
        this.sprite.setFps(30)
    }

    public start(): void {
        this.rigid = new RigidBody(1, 9.8);
        this.speed = 0;
    }

    public update(deltaTime: number): void { 
           
        this.sprite.playAnimation()
        this.setPath(this.sprite.getPath())

        if (this.gameState === gameState.PLAYING) {
            if (this.rigid) {
                const direction = this.getCanvasPosition().Down()
                this.speed += this.rigid.getGravity()
                this.setCanvasPosition(
                    this.getCanvasPosition().add(direction.multiplyScalar(deltaTime * this.speed))
                )

                this.collider.setPosition(this.getCanvasPosition())
            }

            // Handle jumping
            if (this.mouseEvent.isMousePressed()) {
                const direction = this.getCanvasPosition().Up()
                this.setCanvasPosition(
                    this.getCanvasPosition().add(
                        direction.multiplyScalar(deltaTime * this.jumpSpeed)
                    )
                )
                this.speed = -this.jumpSpeed

                this.collider.setPosition(this.getCanvasPosition())
            }

            // Update rotation based on speed
            // if (this.speed > this.jumpSpeed) {
            //     this.rotateImage(90)
            // } else {
            //     this.getTransform().setRotation(25)
            // }
        }
    }


    public draw(){
        this.collider.draw(this.view.getCtx())  
        const ctx = this.view.getCtx();
        ctx.save();

        ctx.translate(
            this.getCanvasPosition().getX(),
            this.getCanvasPosition().getY()
        )
        // ctx.rotate(this.getCanvasTransform().getRotation())

        ctx.drawImage(
            this.getImage(),
            this.getPosition().getX(),
            this.getPosition().getY(),
            this.getWidth(),
            this.getHeight(),
            -this.getCanvasWidth()/2,
            -this.getCanvasHeight()/2,
            this.getCanvasWidth(),
            this.getCanvasHeight()
        )

        ctx.restore()
       
    }

    public destroy(): void {
        this.speed = 0
        this.jumpSpeed = 0
        this.rigid = undefined
    }
}

export default Bird

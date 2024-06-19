import Collider from "../../engine/components/Collider";
import RigidBody from "../../engine/components/RigidBody";
import Sprite from "../../engine/components/Sprite";
import Transform from "../../engine/components/Transform";
import MouseEventHandler from "../../engine/controller/MouseEventHandler";
import GameImage from "../../engine/gameObject/GameImage";
import GameState from "../constant/GameState";


class Bird extends GameImage {
    public rigid: RigidBody;
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
        super(path, position, width, height, canvasPosition, canvasWidth, canvasHeight, true)
        this.rigid = new RigidBody(1, 9.8)
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
        const imagePaths = [
            '../../assets/images/yellowbird-downflap.png',
            '../../assets/images/yellowbird-midflap.png',
            '../../assets/images/yellowbird-upflap.png'
        ];

        imagePaths.forEach(path => {
            const image = new Image();
            image.src = path;
            this.sprite.addImage(image);
        });
        this.sprite.setFps(10)
    }

    public update(deltaTime: number): void { 
           
        this.sprite.playAnimation()
        this.setImage(this.sprite.getImage())

        if (this.gameState === GameState.PLAYING) {
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
            //     this.rotation = 90 * (Math.PI / 180) 
            // } else {
            //     this.rotation = -30 * (Math.PI / 180) 
            // }
        }
    }


    // public draw(){
    //     this.collider.draw(this.view.getCtx())  
    //     const ctx = this.view.getCtx();
    //     ctx.save();

    //     ctx.translate(
    //         this.getCanvasPosition().getX(),
    //         this.getCanvasPosition().getY()
    //     )
    //     ctx.rotate(this.rotation)

    //     ctx.drawImage(
    //         this.image,
    //         this.getPosition().getX(),
    //         this.getPosition().getY(),
    //         this.getWidth(),
    //         this.getHeight(),
    //         -this.getWidth()/2,
    //         -this.getHeight()/2,
    //         this.getCanvasWidth(),
    //         this.getCanvasHeight()
    //     )

    //     ctx.restore()
       
    // }

    public destroy(): void {
        this.speed = 0
        this.jumpSpeed = 0
        this.rigid.destroy()
    }
}

export default Bird

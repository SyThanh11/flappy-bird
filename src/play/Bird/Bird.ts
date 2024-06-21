import RigidBody from "../../engine/components/RigidBody";
import Sprite from "../../engine/components/Sprite";
import Transform from "../../engine/components/Transform";
import ResourceManager from "../../engine/controller/ResourceManager";
import GameImage from "../../engine/gameObject/GameImage";

class Bird extends GameImage {
    public rigid: RigidBody;
    private sprite: Sprite = new Sprite()
    private isJumping: boolean = false
    private mouseUp: boolean = false
    private mouseDown: boolean = false
    
    constructor(
        image: HTMLImageElement,
        position: Transform,
        width: number,
        height: number,
        canvasPosition: Transform,
        canvasWidth: number,
        canvasHeight: number,
        private speed: number,
        private jumpSpeed: number
    ) {
        super(image, position, width, height, canvasPosition, canvasWidth, canvasHeight)
        this.rigid = new RigidBody(1, 9.8)
        this.initSpriteAnimation()
    }

    public draw(): void {
        super.draw()
        if (this.getCollider()) {
            this.getCollider().draw(this.view.getCtx())
        }
    }

    public setSpeed(speed: number): void {
        this.speed = speed
    }
    public setJumpSpeed(jumpSpeed: number): void {
        this.jumpSpeed = jumpSpeed
    }

    private initSpriteAnimation(): void {
        const listOfImages: HTMLImageElement[] = [
            ResourceManager.getInstance().getImage(18),
            ResourceManager.getInstance().getImage(19),
            ResourceManager.getInstance().getImage(20)
        ];

        listOfImages.forEach(image => {
            this.sprite.addImage(image);
        });
        this.sprite.setFps(10)
    }

    public update(deltaTime: number): void { 
           
        this.sprite.playAnimation()
        this.setImage(this.sprite.getImage())

        if (this.rigid) {
            const direction = this.getCanvasPosition().Down()
            this.speed += this.rigid.getGravity()
            this.setCanvasPosition(
                this.getCanvasPosition().add(direction.multiplyScalar(deltaTime * this.speed))
            )
        }

        if (this.isJumping) {
            const direction = this.getCanvasPosition().Up()
            this.setCanvasPosition(
                this.getCanvasPosition().add(
                    direction.multiplyScalar(deltaTime * this.jumpSpeed)
                )
            )
            this.speed = -this.jumpSpeed
            this.isJumping = false
        }
    }

    public handleInput(event: Event): void {
        if(event.type === "mousedown"){
            this.mouseDown = true
        }
        if(event.type === "mouseup"){
            this.mouseUp = true
        }
        if(this.mouseUp && this.mouseDown){
            this.isJumping = !this.isJumping
            this.mouseUp = false
            this.mouseDown = false
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

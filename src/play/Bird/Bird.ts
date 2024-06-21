import RigidBody from "../../engine/components/RigidBody";
import Sprite from "../../engine/components/Sprite";
import Transform from "../../engine/components/Transform";
import ResourceManager from "../../engine/controller/ResourceManager";
import GameImage from "../../engine/gameObject/GameImage";
import CanvasView from "../../engine/view/CanvasView";

const DEGREE = Math.PI / 180

class Bird extends GameImage {
    public rigid: RigidBody;
    private sprite: Sprite = new Sprite()
    private isJumping: boolean = false
    private mouseUp: boolean = false
    private mouseDown: boolean = false
    public view: CanvasView = new CanvasView('canvas')

    
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

        this.getCollider().setRadius(15);
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
        console.log(this.speed);
        console.log(this.jumpSpeed);
        

        if(this.speed > this.jumpSpeed){
            this.getCanvasTransform().setRotation(90*DEGREE)
        } else {
            if(this.speed && this.jumpSpeed)
            this.getCanvasTransform().setRotation(-30*DEGREE)
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


    public draw(){
        this.getCollider().draw(this.view.getCtx())  
        const ctx = this.view.getCtx();
        ctx.save();

        ctx.translate(
            this.getCanvasPosition().getX() + this.getCanvasWidth()/2,
            this.getCanvasPosition().getY() + this.getCanvasHeight()/2
        )

        ctx.rotate(this.getCanvasTransform().getRotation())

        ctx.drawImage(
            this.getImage(),
            this.getPosition().getX(),
            this.getPosition().getY(),
            this.getWidth(),
            this.getHeight(),
            -this.getWidth()/2,
            -this.getHeight()/2,
            this.getCanvasWidth(),
            this.getCanvasHeight()
        )

        ctx.restore()
       
    }

    public destroy(): void {
        this.speed = 0
        this.jumpSpeed = 0
        this.rigid.destroy()
    }
}

export default Bird

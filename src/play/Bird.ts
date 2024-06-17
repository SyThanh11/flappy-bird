import Transform from '../engine/components/Transform';
import Image from '../engine/gameObject/Image';
import RigidBody from '../engine/components/RigidBody';
import MouseEventHandler from '../engine/controller/MouseEventHandler';
import Collider from '../engine/components/Collider';
import Sprite from '../engine/components/Sprite';

class Bird extends Image {
    public rigid: RigidBody | undefined;
    public collider: Collider;
    private mouseEvent: MouseEventHandler = new MouseEventHandler('canvas');
    private sprite: Sprite = new Sprite();

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
        super(path, position, width, height, canvasPosition, canvasWidth, canvasHeight);
        this.speed = speed;
        this.jumpSpeed = jumpSpeed;
        this.collider = new Collider(this.getCanvasPosition(), this.getCanvasWidth(), this.getCanvasHeight());
        this.initSpriteAnimation();
    }

    private initSpriteAnimation(): void {
        this.sprite.addPath('../../assets/images/yellowbird-downflap.png');
        this.sprite.addPath('../../assets/images/yellowbird-midflap.png');
        this.sprite.addPath('../../assets/images/yellowbird-upflap.png');
        this.sprite.setFps(10); 
    }

    public start(): void {
        this.rigid = new RigidBody(1, 4);        
    }

    public update(deltaTime: number) {
        // fall down
        if (this.rigid) {
            const direction = this.getCanvasPosition().Down();
            this.speed += this.rigid.getGravity(); 
            this.setCanvasPosition(this.getCanvasPosition().add(direction.multiplyScalar(deltaTime*this.speed)));

            this.collider.setPosition(this.getCanvasPosition());
        }

        // jump
        if (this.mouseEvent.isMousePressed()) {
            const direction = this.getCanvasPosition().Up();
            this.setCanvasPosition(this.getCanvasPosition().add(direction.multiplyScalar(deltaTime*this.jumpSpeed)));
            this.speed = -this.jumpSpeed;

            this.collider.setPosition(this.getCanvasPosition());
        }

        // animation
        this.sprite.playAnimation(); 
        this.setPath(this.sprite.getPath()); 
    }

    public destroy(): void {
        this.speed = 0;
        this.jumpSpeed = 0;
        this.rigid = undefined;
    }

}

export default Bird

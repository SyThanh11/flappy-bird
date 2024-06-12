import KeyAccess from '../input/KeyAccess'
import Physics from '../physics/Physics';
import GameObject from './GameObject'
import Pipe from './Pipe'
import Vector2D from './Vector2D'

//     public collidesWith(listOfPipes: Pipe[]): boolean {
//         let collides = false;
//         if(
//             this.position.getX() + this.size.getX() > listOfPipes[0].getPosition().getX() &&
//             this.position.getX() < listOfPipes[0].getPosition().getX() + listOfPipes[0].getSize().getX() &&
//             (
//                 this.position.getY() < listOfPipes[0].getPosition().getY() + listOfPipes[0].getSize().getY() ||
//                 this.position.getY() + this.size.getY() > listOfPipes[0].getPosition().getY() + listOfPipes[0].getSize().getY() + listOfPipes[0].getSpace()
//             )

//         ){
//             collides = true;
//         }
//         return collides;
//     }

class Bird extends GameObject {
    constructor(
        path: string,
        canvasPosition: Vector2D,
        speed: number,
        private frame: number,
        private indexPath: number,
        private gravity: number,
        private jumpSpeed: number
    ) {
        super(path, new Vector2D(0, 0), 34, 24, canvasPosition, 34, 24, speed);
        this.frame = 0;
        this.indexPath = 0;
    }

    // setter
    public setFrame(frame: number): void {
        this.frame = frame;
    }
    public setIndexPath(indexPath: number): void {
        this.indexPath = indexPath;
    }
    public setGravity(gravity: number): void {
        this.gravity = gravity;
    }
    public setJumpSpeed(jumpSpeed: number): void {
        this.jumpSpeed = jumpSpeed;
    }

    // getter
    public getFrame(): number {
        return this.frame;
    }
    public getIndexPath(): number {
        return this.indexPath;
    }
    public getGravity(): number {
        return this.gravity;
    }
    public getJumpSpeed(): number {
        return this.jumpSpeed;
    }

    public draw(context: CanvasRenderingContext2D){
        context.drawImage(
            this.gameObject.image,
            this.gameObject.position.getX(),
            this.gameObject.position.getY(),
            this.gameObject.width,
            this.gameObject.height,
            this.gameObject.canvasPosition.getX(),
            this.gameObject.canvasPosition.getY(),
            this.gameObject.canvasWidth,
            this.gameObject.canvasHeight
        )
    }

    public update(deltaTime: number)
    {
        this.frame++;
        const path = [
            '../../assets/images/yellowbird-downflap.png',
            '../../assets/images/yellowbird-midflap.png',
            '../../assets/images/yellowbird-upflap.png'
        ]
        if(this.frame % 15 == 0){
            this.indexPath++;
            if(this.indexPath > 2){
                this.indexPath = 0;
            }
            this.setImage(path[this.indexPath]);
        }

        // fall down
        this.gameObject.speed += this.gravity;
        this.gameObject.canvasPosition = this.gameObject.canvasPosition.add(
            new Vector2D(0, deltaTime*(this.gameObject.speed)));

        // jump
        if(KeyAccess.isKeyPressed(KeyAccess.SPACE)){
            this.flap(deltaTime);
        }

    }

    public flap(deltaTime: number): void { 
        const jumpDistance = this.jumpSpeed * deltaTime;
        this.gameObject.canvasPosition = this.gameObject.canvasPosition.add(new Vector2D(0, -jumpDistance));
        this.gameObject.speed = -this.jumpSpeed;
    }
    
    // public update(deltaTime: number): void {
    //     if (KeyAccess.isKeyPressed(KeyAccess.ARROW_LEFT)) {
    //         let direction = this.gameObject.position.Left();
    //         this.move(deltaTime, direction)
    //     }
    //     else if (KeyAccess.isKeyPressed(KeyAccess.ARROW_RIGHT)) {
    //         let direction = this.gameObject.position.Right();
    //         this.move(deltaTime, direction)
    //     }
    //     else if (KeyAccess.isKeyPressed(KeyAccess.ARROW_UP)) {
    //         let direction = this.gameObject.position.Up();
    //         this.move(deltaTime, direction)
    //     }
    //     else if (KeyAccess.isKeyPressed(KeyAccess.ARROW_DOWN)) {
    //         let direction = this.gameObject.position.Down();
    //         this.move(deltaTime, direction)
    //     }
    // }

    // public move(deltaTime: number, direction: Vector2D){
    //     let distance: Vector2D = direction.multiplyScalar(deltaTime*this.gameObject.speed);
    //     this.gameObject.canvasPosition = this.gameObject.canvasPosition.add(distance);
    // }
}

export default Bird

import KeyAccess from '../input/KeyAccess'
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
        private indexPath: number
    ) {
        super(path, new Vector2D(0, 0), 34, 24, canvasPosition, 34, 24, speed);
        this.frame = 0;
        this.indexPath = 0;
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

    public updateScreen()
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
    }
    
    public update(deltaTime: number): void {
        if (KeyAccess.isKeyPressed(KeyAccess.ARROW_LEFT)) {
            let direction = this.gameObject.position.Left();
            this.move(deltaTime, direction)
        }
        else if (KeyAccess.isKeyPressed(KeyAccess.ARROW_RIGHT)) {
            let direction = this.gameObject.position.Right();
            this.move(deltaTime, direction)
        }
        else if (KeyAccess.isKeyPressed(KeyAccess.ARROW_UP)) {
            let direction = this.gameObject.position.Up();
            this.move(deltaTime, direction)
        }
        else if (KeyAccess.isKeyPressed(KeyAccess.ARROW_DOWN)) {
            let direction = this.gameObject.position.Down();
            this.move(deltaTime, direction)
        }
    }

    public move(deltaTime: number, direction: Vector2D){
        let distance: Vector2D = direction.multiplyScalar(deltaTime*this.gameObject.speed);
        this.gameObject.canvasPosition = this.gameObject.canvasPosition.add(distance);
    }
}

export default Bird

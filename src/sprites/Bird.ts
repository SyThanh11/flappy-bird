import KeyAccess from "../input/KeyAccess";
import Pipe from "./Pipe";
import Vector2D from "./Vector2D";


class Bird {
    private position: Vector2D;
    private size: Vector2D;
    private speed: number;
    
    constructor(position: Vector2D, size: Vector2D, speed: number) {
        this.position = position;
        this.size = size;
        this.speed = speed;
    }

    // getter
    public getPosition(): Vector2D {
        return this.position;
    }
    public getSize(): Vector2D {
        return this.size;
    }
    public getSpeed(): number {
        return this.speed;
    }

    // setter
    public setPosition(position: Vector2D): void {
        this.position = position;
    }
    public setSize(size: Vector2D): void {
        this.size = size;
    }
    public setSpeed(speed: number): void {
        this.speed = speed;
    }

    // actions
    public move(deltaTime: number, direction: Vector2D): void {
        let distance: Vector2D = direction.multiplyScalar(deltaTime*this.speed);
        this.position = this.position.add(distance);
    }

    // collision detection
    public collidesWith(listOfPipes: Pipe[]): boolean {
        let collides = false;
        if(
            this.position.getX() + this.size.getX() > listOfPipes[0].getPosition().getX() &&
            this.position.getX() < listOfPipes[0].getPosition().getX() + listOfPipes[0].getSize().getX() &&
            (
                this.position.getY() < listOfPipes[0].getPosition().getY() + listOfPipes[0].getSize().getY() ||
                this.position.getY() + this.size.getY() > listOfPipes[0].getPosition().getY() + listOfPipes[0].getSize().getY() + listOfPipes[0].getSpace() 
            )
            
        ){
            console.log("collides!");
            
            collides = true;
        }
        return collides;
    }

    updateBird = (deltaTime: number): void => {
        if (KeyAccess.isKeyPressed(KeyAccess.ARROW_LEFT)) {
            let direction = this.position.Left();
            this.move(deltaTime, direction)
        }
        else if (KeyAccess.isKeyPressed(KeyAccess.ARROW_RIGHT)) {
            let direction = this.position.Right();
            this.move(deltaTime, direction)
        }
        else if (KeyAccess.isKeyPressed(KeyAccess.ARROW_UP)) {
            let direction = this.position.Up();
            this.move(deltaTime, direction)
        }
        else if (KeyAccess.isKeyPressed(KeyAccess.ARROW_DOWN)) {
            let direction = this.position.Down();
            this.move(deltaTime, direction)
        }
    }
}



export default Bird;
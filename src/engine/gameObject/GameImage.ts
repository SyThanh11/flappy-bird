import Collider from '../components/Collider'
import CanvasView from '../view/CanvasView'
import GameObject from './GameObject'

class GameImage extends GameObject {
    public view: CanvasView = new CanvasView('canvas')
    public collider: Collider

    public draw(): void {
        if(this.collider){
            this.collider.draw(this.view.getCtx())
        }
        this.view
            .getCtx()
            .drawImage(
                this.image,
                this.getPosition().getX(),
                this.getPosition().getY(),
                this.getWidth(),
                this.getHeight(),
                this.getCanvasPosition().getX(),
                this.getCanvasPosition().getY(),
                this.getCanvasWidth(),
                this.getCanvasHeight()
            )
    }

    public start(): void {
        this.image = new Image();
        this.image.src = this.getPath();
    }
    public update(deltaTime: number): void {}
    public destroy(): void {}
}

export default GameImage

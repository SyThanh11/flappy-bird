import CanvasView from '../view/CanvasView'
import GameObject from './GameObject'

class GameImage extends GameObject {
    public view: CanvasView = new CanvasView('canvas')

    public draw(): void {
        if (this.getCollider()) {
            this.getCollider().draw(this.view.getCtx())
        }
        this.view
            .getCtx()
            .drawImage(
                this.getImage(),
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
}

export default GameImage

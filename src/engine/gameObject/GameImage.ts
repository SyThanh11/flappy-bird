import CanvasView from '../view/CanvasView'
import GameObject from './GameObject'

class GameImage extends GameObject {
    private view: CanvasView = new CanvasView('canvas')

    public draw(): void {
        super.draw(this.view.getCtx(), this.view.getCanvas())
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

    public getView(): CanvasView {
        return this.view
    }
}

export default GameImage

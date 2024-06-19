import CanvasView from '../view/CanvasView'
import GameObject from './GameObject'

class Text extends GameObject {
    public view: CanvasView = new CanvasView('canvas')

    setText(text: string): void {}
    setFont(font: string): void {}
    setColor(color: string): void {}
    setSize(size: number): void {}

    public start(): void {}
    public draw(): void {}
    public update(deltaTime: number): void {}
    public destroy(): void {}
}

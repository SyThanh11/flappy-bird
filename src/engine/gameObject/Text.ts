import GameObject from "./GameObject";

class Text extends GameObject {
    setText(text: string): void {};
    setFont(font: string): void {};
    setColor(color: string): void {};

    public start(): void {};
    public draw(): void {};
    public update(deltaTime: number): void {};
    public destroy(): void {}
}
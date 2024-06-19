import Transform from "../../engine/components/Transform";
import MouseEventHandler from "../../engine/controller/MouseEventHandler";
import GameImage from "../../engine/gameObject/GameImage";

class Button extends GameImage implements MouseEventListener {
    private mouseEventHandler: MouseEventHandler;
    private isClicked: boolean = false;

    constructor(path: string, position: Transform, width: number, height: number, canvasPosition: Transform, canvasWidth: number, canvasHeight: number) {
        super(path, position, width, height, canvasPosition, canvasWidth, canvasHeight, true);
        this.mouseEventHandler = new MouseEventHandler('canvas');
        this.mouseEventHandler.addObserver(this);
    }

    public getIsClicked(): boolean {
        return this.isClicked;
    }

    public setIsClicked(value: boolean): void {
        this.isClicked = value;
    }

    public onMouseDown(event: MouseEvent): void {
        if (this.checkClickButton(event)) {
            this.isClicked = true;
            console.log(`Button clicked at (${event.clientX}, ${event.clientY})`);
        }
    }

    public onMouseUp(event: MouseEvent): void {
        this.isClicked = false;
    }

    private checkClickButton(event: MouseEvent): boolean {
        return (
            event.clientX <= this.getCanvasPosition().getX() + this.getCanvasWidth() &&
            event.clientX >= this.getCanvasPosition().getX() &&
            event.clientY <= this.getCanvasPosition().getY() + this.getCanvasHeight() &&
            event.clientY >= this.getCanvasPosition().getY()
        );
    }
}

export default Button;

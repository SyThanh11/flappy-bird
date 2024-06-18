import Image from "../../engine/gameObject/Image";

class Button extends Image {
    private isClicked: boolean;

    public getIsClicked(): boolean {
        return this.isClicked;
    }

    public setIsClicked(value: boolean): void {
        this.isClicked = value;
    }

    public checkClickButton(event: MouseEvent): void {        
        (
            event.clientX <= this.getCanvasPosition().getX() + this.getCanvasWidth() &&
            event.clientX >= this.getCanvasPosition().getX() &&
            event.clientY <= this.getCanvasPosition().getY() + this.getCanvasHeight() &&
            event.clientY >= this.getCanvasPosition().getY()
        ) ? this.isClicked = true : this.isClicked = false;
    }
}

export default Button

import GameImage from "../../engine/gameObject/GameImage";

class Button extends GameImage {
    private isClicked: boolean = false;

    public getIsClicked(): boolean {
        return this.isClicked;
    }

    public setIsClicked(value: boolean): void {
        this.isClicked = value;
    }

    public handleInput(event: Event): void {
        
        if(event.type === 'mousedown'){
            if(this.checkClickButton(event as MouseEvent)){
                this.setIsClicked(true);
            }
        } else {
            this.setIsClicked(false);
        }
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

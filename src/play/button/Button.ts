import GameImage from '../../engine/gameObject/GameImage'

class Button extends GameImage {
    private isMouseDown = false
    private isClicked = false

    public getIsClicked(): boolean {
        return this.isClicked
    }

    public setIsClicked(value: boolean): void {
        this.isClicked = value
    }

    public handleInput(event: Event): void {
        this.setIsClicked(false)
        if (event.type === 'mousedown') {
            if (this.checkClickButton(event as MouseEvent)) {
                this.isMouseDown = true
            }
        } else if (event.type === 'mouseup') {
            if (this.checkClickButton(event as MouseEvent)) {
                if (this.isMouseDown) {
                    this.isMouseDown = false
                    this.setIsClicked(true)
                }
            }
        }
    }

    private checkClickButton(event: MouseEvent): boolean {
        return (
            event.clientX <= this.getCanvasPosition().getX() + this.getCanvasWidth() &&
            event.clientX >= this.getCanvasPosition().getX() &&
            event.clientY <= this.getCanvasPosition().getY() + this.getCanvasHeight() &&
            event.clientY >= this.getCanvasPosition().getY()
        )
    }
}

export default Button

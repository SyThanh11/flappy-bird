class MouseEventHandler {
    private canvas: HTMLCanvasElement;
    private isMouseDown: boolean = false;

    constructor(canvasId: string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        
        // Bắt sự kiện click chuột
        this.canvas.addEventListener('click', this.handleClick.bind(this));
        
        // Bắt sự kiện nhấn chuột xuống
        this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
        
        // Bắt sự kiện nhả chuột lên
        this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
    }

    private handleClick(event: MouseEvent): void {
    }

    private handleMouseDown(event: MouseEvent): void {
        this.isMouseDown = true;
    }

    private handleMouseUp(event: MouseEvent): void {
        this.isMouseDown = false;
    }

    public isMousePressed(): boolean {
        return this.isMouseDown;
    }
}

export default MouseEventHandler;
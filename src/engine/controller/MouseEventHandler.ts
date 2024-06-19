class MouseEventHandler {
    private canvas: HTMLCanvasElement
    private isMouseDown: boolean = false
    private observers: MouseEventListener[] = []
    private timeoutId: NodeJS.Timeout | null = null

    constructor(canvasId: string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement

        // Bắt sự kiện nhấn chuột xuống
        this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this))

        // Bắt sự kiện nhả chuột lên
        this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this))
    }

    private handleMouseDown(event: MouseEvent): void {
        this.isMouseDown = true
        this.notifyObserversMouseDown(event)
    }

    private handleMouseUp(event: MouseEvent): void {
        this.isMouseDown = false
        this.notifyObserversMouseUp(event)
    }

    public isMousePressed(): boolean {
        return this.isMouseDown
    }

    public addObserver(observer: MouseEventListener): void {
        this.observers.push(observer)
    }

    public removeObserver(observer: MouseEventListener): void {
        this.observers = this.observers.filter((obs) => obs !== observer)
    }

    private notifyObserversMouseDown(event: MouseEvent): void {
        this.observers.forEach((observer) => {
            observer.onMouseDown(event)
        })
        console.log();
        
        if(this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }

    private notifyObserversMouseUp(event: MouseEvent): void {
        this.observers.forEach((observer) => {
            observer.onMouseUp(event)
        })

        this.timeoutId = setTimeout(() => {
            this.isMouseDown = false;
            this.timeoutId = null; // Clear timeoutId after resetting isMouseDown
        }, 1000);
    }
}

export default MouseEventHandler

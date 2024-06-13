class CanvasView {
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D

    constructor(canvasName: string) {
        this.canvas = document.querySelector(canvasName) as HTMLCanvasElement
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    }

    clear = (): void => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    // getter
    getCanvas = (): HTMLCanvasElement => {
        return this.canvas
    }
    getCtx = (): CanvasRenderingContext2D => {
        return this.ctx
    }
}

export default CanvasView

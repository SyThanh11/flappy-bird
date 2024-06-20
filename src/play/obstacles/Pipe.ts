import GameImage from '../../engine/gameObject/GameImage'

class Pipe extends GameImage {
    private speed = 0

    public setSpeed(speed: number): void {
        this.speed = speed
    }
    public getSpeed(): number {
        return this.speed
    }

    public update(deltaTime: number): void {
        const direction = this.getCanvasPosition().Left()
        this.setCanvasPosition(
            this.getCanvasPosition().add(direction.multiplyScalar(deltaTime * this.speed))
        )
    }

    public destroy(): void {
        this.speed = 0
    }
}

export default Pipe

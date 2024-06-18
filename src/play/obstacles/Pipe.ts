import Collider from '../../engine/components/Collider'
import GameImage from '../../engine/gameObject/GameImage'

class Pipe extends GameImage {
    private speed = 0

    public collider: Collider = new Collider(
        this.getCanvasPosition(),
        this.getCanvasWidth(),
        this.getCanvasHeight()
    )

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
        this.collider.setPosition(this.getCanvasPosition())
    }

    public destroy(): void {
        this.speed = 0
    }
}

export default Pipe

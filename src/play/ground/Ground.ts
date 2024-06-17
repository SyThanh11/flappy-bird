import Collider from '../../engine/components/Collider'
import Image from '../../engine/gameObject/Image'

class Ground extends Image {
    private speed = 0
    public collider: Collider = new Collider(
        this.getCanvasPosition(),
        this.getCanvasWidth(),
        this.getCanvasHeight()
    )

    public setSpeed(speed: number): void {
        this.speed = speed
    }

    public start(): void {}

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

export default Ground

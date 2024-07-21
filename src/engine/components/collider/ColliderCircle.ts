import Vector2D from '../Vector2D'
import Collider from './Collider'

class ColliderCircle extends Collider {
    private radius: number

    constructor(position: Vector2D, radius: number) {
        super(position, 0, 0)
        this.radius = radius
    }

    public getRadius(): number {
        return this.radius
    }

    public setRadius(radius: number): void {
        this.radius = radius
    }

    public draw(context: CanvasRenderingContext2D): void {
        if (this.getDebug()) {
            context.strokeStyle = 'black'
            context.beginPath()
            context.arc(
                this.getPosition().getX() + this.radius,
                this.getPosition().getY() + this.radius,
                this.radius,
                0,
                2 * Math.PI
            )
            context.stroke()
        }
    }

    public isColliding(otherCollision: Collider): boolean {
        const otherLeft = otherCollision.getPosition().getX()
        const otherRight = otherCollision.getPosition().getX() + otherCollision.getWidth()
        const otherTop = otherCollision.getPosition().getY()
        const otherBottom = otherCollision.getPosition().getY() + otherCollision.getHeight()

        const center = new Vector2D(
            this.getPosition().getX() + this.radius,
            this.getPosition().getY() + this.radius
        )
        const otherCenter = new Vector2D(
            otherLeft + (otherRight - otherLeft) / 2,
            otherTop + (otherBottom - otherTop) / 2
        )

        const distanceX = Math.abs(center.getX() - otherCenter.getX())
        const distanceY = Math.abs(center.getY() - otherCenter.getY())

        if (distanceX > otherCollision.getWidth() / 2 + this.radius) return false
        if (distanceY > otherCollision.getHeight() / 2 + this.radius) return false

        if (distanceX <= otherCollision.getWidth() / 2) return true
        if (distanceY <= otherCollision.getHeight() / 2) return true

        const distance =
            Math.pow(distanceX - otherCollision.getWidth() / 2, 2) +
            Math.pow(distanceY - otherCollision.getHeight(), 2)

        return distance <= Math.pow(this.radius, 2)
    }
}

export default ColliderCircle

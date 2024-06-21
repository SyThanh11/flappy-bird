import Collidable from '../../types/collidable'
import Vector2D from './Vector2D'

class Collider implements Collidable {
    private position: Vector2D
    private width: number
    private height: number
    private radius: number

    constructor(position: Vector2D, width?: number, height?: number, radius?: number) {
        this.position = position
        if (radius) {
            this.radius = radius
        } else if (width && height) {
            {
                this.width = width
                this.height = height
            }
        }
    }

    public getPosition(): Vector2D {
        return this.position
    }
    public getWidth(): number {
        return this.width
    }
    public getHeight(): number {
        return this.height
    }
    public getRadius(): number {
        return this.radius
    }

    public setPosition(position: Vector2D): void {
        this.position = position
    }
    public setWidth(width: number): void {
        this.width = width
    }
    public setHeight(height: number): void {
        this.height = height
    }
    public setRadius(radius: number): void {
        this.radius = radius
    }

    public draw(context: CanvasRenderingContext2D) {
        context.strokeStyle = 'black'
        if (this.radius > 0) {
            context.beginPath()
            context.arc(
                this.position.getX() + this.radius,
                this.position.getY() + this.radius,
                this.radius,
                0,
                2 * Math.PI
            )
            context.stroke()
        } else {
            context.strokeRect(this.position.getX(), this.position.getY(), this.width, this.height)
        }
    }

    public isColliding(otherCollision: Collider): boolean {
        const thisLeft = this.position.getX()
        const thisRight = this.position.getX() + this.width
        const thisTop = this.position.getY()
        const thisBottom = this.position.getY() + this.height

        const otherLeft = otherCollision.getPosition().getX()
        const otherRight = otherCollision.getPosition().getX() + otherCollision.getWidth()
        const otherTop = otherCollision.getPosition().getY()
        const otherBottom = otherCollision.getPosition().getY() + otherCollision.getHeight()

        if (
            thisRight >= otherLeft &&
            thisLeft <= otherRight &&
            thisBottom >= otherTop &&
            thisTop <= otherBottom
        ) {
            return true
        }
        return false
    }

    public clamp(value: number, min: number, max: number): number {
        return Math.max(min, Math.min(max, value))
    }

    public isCollidingWithCircle(otherCollision: Collider): boolean {
        const otherLeft = otherCollision.getPosition().getX()
        const otherRight = otherCollision.getPosition().getX() + otherCollision.getWidth()
        const otherTop = otherCollision.getPosition().getY()
        const otherBottom = otherCollision.getPosition().getY() + otherCollision.getHeight()

        const center = new Vector2D(
            this.position.getX() + this.radius,
            this.position.getY() + this.radius
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

export default Collider

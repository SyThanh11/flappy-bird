import Vector2D from "../sprites/Vector2D"

export type GameObjectType = {
    image: HTMLImageElement
    position: Vector2D
    width: number
    height: number
    canvasPosition: Vector2D
    canvasWidth: number
    canvasHeight: number
    speed: number
}
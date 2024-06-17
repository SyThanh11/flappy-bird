
// import Vector2D from "../engine/components/Vector2D";
// import GameObject from "../engine/gameObject/GameObject";

// class Button extends GameObject {
//     constructor(
//         path: string,
//         position: Vector2D,
//         width: number,
//         height: number,
//         canvasPosition: Vector2D,
//         canvasWidth: number,
//         canvasHeight: number,
//         speed: number,
//     ) {
//         super(path, position, width, height, canvasPosition, canvasWidth, canvasHeight, speed)
//     }

//     public draw(context: CanvasRenderingContext2D): void {
//         super.draw(context);
//     }

//     public update(deltaTime: number): void {}

//     public checkClickButton(event: PointerEvent): boolean {
//         if(
//             event.clientX <= this.gameObject.canvasPosition.getX() + this.gameObject.canvasWidth &&
//             event.clientX >= this.gameObject.canvasPosition.getX() &&
//             event.clientY <= this.gameObject.canvasPosition.getY() + this.gameObject.canvasHeight &&
//             event.clientY >= this.gameObject.canvasPosition.getY()
//         ){     
//             return true;
//         }
//         return false;
//     }


// }

// export default Button

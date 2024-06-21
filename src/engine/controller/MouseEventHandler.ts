import GameObject from "../gameObject/GameObject"
import Scene from "../scene/Scene"

class MouseEventHandler {
    private static instance: MouseEventHandler = new MouseEventHandler()
    private isMouseDown: boolean = false
    private listObject: GameObject[] = []
    private listScene: Scene[] = []

    constructor() {}

    public static getInstance(): MouseEventHandler {
        return this.instance
    }

    public addObject(object: GameObject){
        this.listObject.push(object)
    }

    public addScene(scene: Scene){
        this.listScene.push(scene)
    }

    public addEvent(name: string){
        if(name == 'mousedown'){
            window.addEventListener(name, this.handleMouseDown.bind(this))
        } else if(name == 'mouseup'){
            window.addEventListener(name, this.handleMouseUp.bind(this))
        } else if(name === 'contextmenu'){
            window.addEventListener(name, this.handleContextMenu.bind(this))
        }
    }

    private handleMouseDown(event: MouseEvent): void {
        this.isMouseDown = true
        
        this.listObject.forEach((object) => { 
            object.handleInput(event)
        })

        this.listScene.forEach((scene) => { 
            scene.handleInput(event)
        })
    }

    private handleMouseUp(event: MouseEvent): void {
        this.isMouseDown = false

        this.listObject.forEach((object) => { 
            object.handleInput(event)
        })

        this.listScene.forEach((scene) => { 
            scene.handleInput(event)
        })
    }

    private handleContextMenu(event: MouseEvent): void {
        event.preventDefault()
    }

    public isMousePressed(): boolean {
        return this.isMouseDown
    }
}

export default MouseEventHandler

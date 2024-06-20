import Transform from "../../engine/components/Transform";
import ResourceManager from "../../engine/controller/ResourceManager";
import GameObject from "../../engine/gameObject/GameObject";
import Scene from "../../engine/scene/Scene";
import GroundManager from "../ground/GroundManager";
import PipeManager from "../obstacles/PipeManager";


class MiddleGameObject extends GameObject {
    private listOfGrounds: GroundManager
    private listOfPipes: PipeManager

    constructor(){
        super(new Image(), new Transform(), 0, 0, new Transform(), 0, 0)
    }
    
    public update(deltaTime: number): void {
        this.listOfGrounds.update(deltaTime)
        this.listOfPipes.update(deltaTime)
    }

    public setGameManager(listOfGrounds: GroundManager, listOfPipes: PipeManager): void {
        this.listOfGrounds = listOfGrounds;
        this.listOfPipes = listOfPipes;
    }

    public getListOfGrounds(): GroundManager {
        return this.listOfGrounds;
    }

    public getListOfPipes(): PipeManager {
        return this.listOfPipes;
    }

    public addToScene(scence: Scene): void {
        scence.addGameObject(this)
    }

}

export default MiddleGameObject;
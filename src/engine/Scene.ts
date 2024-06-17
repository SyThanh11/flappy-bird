import GameObject from './gameObject/GameObject'
import CanvasView from './view/CanvasView'

class Scene {
    public listOfGameObjects: GameObject[];
    public view: CanvasView

    constructor() {
        this.listOfGameObjects = [];
        this.view = new CanvasView('canvas');
    }

    public addGameObject(gameObject: GameObject) {
        gameObject.start();
        this.listOfGameObjects.push(gameObject)
    }
    
    public removeGameObject(gameObject: GameObject) {
        gameObject.destroy();
        this.listOfGameObjects.splice(this.listOfGameObjects.indexOf(gameObject), 1);
    }

    public findGameObject(gameObject: GameObject) {
        return this.listOfGameObjects.find((obj) => {
            return obj === gameObject;
        })
    }
        
    public addListOfGameObjects(listOfGameObjects: GameObject[]) {
        listOfGameObjects.forEach((gameObject) => {
            this.addGameObject(gameObject);
        })
    }

    public update(deltaTime: number) {
        this.listOfGameObjects.forEach((gameObject) => {
            gameObject.update(deltaTime);
        })
    }

    public sortLayer(){
        this.listOfGameObjects.sort((a, b) => {
            return a.getLayer() - b.getLayer();
        })
    }

    public draw() {
        this.view.clear();
        this.sortLayer();
        this.listOfGameObjects.forEach((gameObject) => {
            gameObject.draw()
        })
    }
}

export default Scene;

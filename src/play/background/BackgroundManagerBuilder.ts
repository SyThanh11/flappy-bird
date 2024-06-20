import Vector2D from "../../engine/components/Vector2D";
import GameObjectManager from "../../engine/gameObject/GameObjectManager";
import Scene from "../../engine/scene/Scene";
import listOfInputs from "../constant/input";
import ObjectManagerBuilder from "../pattern/builder/ObjectManagerBuilder";
import Background from "./Background";
import BackgroundBuilder from "./BackgroundBuilder";
import BackgroundManager from "./BackgroundManager";

class BackgroundManagerBuilder implements ObjectManagerBuilder<Background> {
    private listOfBackgrounds: BackgroundManager

    constructor(){
        const backgroundBuilder = new BackgroundBuilder();

        this.listOfBackgrounds = new BackgroundManager(
            listOfInputs.listOfBackgroundsInfo.numberOfBackgrounds,
            backgroundBuilder.build(),
            listOfInputs.listOfBackgroundsInfo.indexStart,
            Background,
            new Vector2D(
                listOfInputs.listOfBackgroundsInfo.backgroundInfo.canvasWidth,
                listOfInputs.listOfBackgroundsInfo.backgroundInfo.canvasPosition.getY()
            )
        )
    }

    public build(): GameObjectManager<Background> {
        return this.listOfBackgrounds
    }

    public addToScene(scene: Scene): void {
        scene.addListOfGameObjects(this.listOfBackgrounds.getListOfGameObjects())
    }
}

export default BackgroundManagerBuilder;
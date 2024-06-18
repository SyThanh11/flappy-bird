import Scene from "../../engine/Scene";
import GameObject from "../../engine/gameObject/GameObject";
import GameObjectManager from "../../engine/gameObject/GameObjectManager";

interface ObjectManagerBuilder<T extends GameObject> {
    build(): GameObjectManager<T>; 
    addToScene(scene: Scene): void; 
}

export default ObjectManagerBuilder;
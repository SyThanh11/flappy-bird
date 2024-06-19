import GameObject from "../../../engine/gameObject/GameObject";
import GameObjectManager from "../../../engine/gameObject/GameObjectManager";

interface ObjectManagerBuilder<T extends GameObject> {
    build(): GameObjectManager<T>; 
}

export default ObjectManagerBuilder;
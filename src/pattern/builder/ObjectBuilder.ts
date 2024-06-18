import Scene from "../../engine/Scene";
import GameObject from "../../engine/gameObject/GameObject";

interface ObjectBuilder {
    build(): GameObject; 
    addToScene(scene: Scene): void; 
}

export default ObjectBuilder;
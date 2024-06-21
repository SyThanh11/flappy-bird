import Scene from '../../engine/scene/Scene'

class BaseScene extends Scene {
    constructor() {
        super()
        this.setUp()
    }

    public setUp(): void {}
    public update(deltaTime: number): void {}
    public reload(): void {}
}

export default BaseScene

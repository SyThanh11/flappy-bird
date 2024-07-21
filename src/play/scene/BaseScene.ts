import Scene from '../../engine/scene/Scene'

class BaseScene extends Scene {
    constructor() {
        super()
        this.init()
    }

    public init(): void {}
    public create(): void {}
    public update(_deltaTime: number): void {}
}

export default BaseScene

import ResourceManager from '../../engine/controller/ResourceManager'
import Scene from '../../engine/scene/Scene'

class PreloadScene extends Scene {
    constructor() {
        super()
    }

    public create(): void {
        ResourceManager.getInstance().loadImageKey('0', '../../../assets/image/0.png')
        ResourceManager.getInstance().loadImageKey('1', '../../../assets/image/1.png')
        ResourceManager.getInstance().loadImageKey('2', '../../../assets/image/2.png')
        ResourceManager.getInstance().loadImageKey('3', '../../../assets/image/3.png')
        ResourceManager.getInstance().loadImageKey('4', '../../../assets/image/4.png')
        ResourceManager.getInstance().loadImageKey('5', '../../../assets/image/5.png')
        ResourceManager.getInstance().loadImageKey('6', '../../../assets/image/6.png')
        ResourceManager.getInstance().loadImageKey('7', '../../../assets/image/7.png')
        ResourceManager.getInstance().loadImageKey('8', '../../../assets/image/8.png')
        ResourceManager.getInstance().loadImageKey('9', '../../../assets/image/9.png')

        ResourceManager.getInstance().loadImageKey('ground', '../../../assets/image/base.png')
        ResourceManager.getInstance().loadImageKey(
            'yellowbird-downflap',
            '../../../assets/image/yellowbird-downflap.png'
        )
        ResourceManager.getInstance().loadImageKey(
            'yellowbird-midflap',
            '../../../assets/image/yellowbird-midflap.png'
        )
        ResourceManager.getInstance().loadImageKey(
            'yellowbird-upflap',
            '../../../assets/image/yellowbird-upflap.png'
        )
        ResourceManager.getInstance().loadImageKey(
            'pipe-green-down',
            '../../../assets/image/pipe-green-down.png'
        )
        ResourceManager.getInstance().loadImageKey(
            'pipe-green',
            '../../../assets/image/pipe-green.png'
        )
        ResourceManager.getInstance().loadImageKey('message', '../../../assets/image/message.png')
        ResourceManager.getInstance().loadImageKey(
            'background-day',
            '../../../assets/image/background-day.png'
        )
        ResourceManager.getInstance().loadImageKey(
            'background-night',
            '../../../assets/image/background-night.png'
        )
        ResourceManager.getInstance().loadImageKey('gameover', '../../../assets/image/gameover.png')
        ResourceManager.getInstance().loadImageKey('sprite', '../../../assets/image/sprite.png')
    }

    public update(deltaTime: number): void {
        super.update(deltaTime)
    }
}

export default PreloadScene

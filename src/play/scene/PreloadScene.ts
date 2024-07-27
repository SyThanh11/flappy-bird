import ResourceManager from '../../engine/controller/ResourceManager'
import Scene from '../../engine/scene/Scene'

class PreloadScene extends Scene {
    constructor() {
        super()
    }

    public create(): void {
        ResourceManager.getInstance().loadImageKey('0', '../../../assets/images/0.png')
        ResourceManager.getInstance().loadImageKey('1', '../../../assets/images/1.png')
        ResourceManager.getInstance().loadImageKey('2', '../../../assets/images/2.png')
        ResourceManager.getInstance().loadImageKey('3', '../../../assets/images/3.png')
        ResourceManager.getInstance().loadImageKey('4', '../../../assets/images/4.png')
        ResourceManager.getInstance().loadImageKey('5', '../../../assets/images/5.png')
        ResourceManager.getInstance().loadImageKey('6', '../../../assets/images/6.png')
        ResourceManager.getInstance().loadImageKey('7', '../../../assets/images/7.png')
        ResourceManager.getInstance().loadImageKey('8', '../../../assets/images/8.png')
        ResourceManager.getInstance().loadImageKey('9', '../../../assets/images/9.png')

        ResourceManager.getInstance().loadImageKey('ground', '../../../assets/images/base.png')
        ResourceManager.getInstance().loadImageKey(
            'yellowbird-downflap',
            '../../../assets/images/yellowbird-downflap.png'
        )
        ResourceManager.getInstance().loadImageKey(
            'yellowbird-midflap',
            '../../../assets/images/yellowbird-midflap.png'
        )
        ResourceManager.getInstance().loadImageKey(
            'yellowbird-upflap',
            '../../../assets/images/yellowbird-upflap.png'
        )
        ResourceManager.getInstance().loadImageKey(
            'pipe-green-down',
            '../../../assets/images/pipe-green-down.png'
        )
        ResourceManager.getInstance().loadImageKey(
            'pipe-green',
            '../../../assets/images/pipe-green.png'
        )
        ResourceManager.getInstance().loadImageKey('message', '../../../assets/images/message.png')
        ResourceManager.getInstance().loadImageKey(
            'background-day',
            '../../../assets/images/background-day.png'
        )
        ResourceManager.getInstance().loadImageKey(
            'background-night',
            '../../../assets/images/background-night.png'
        )
        ResourceManager.getInstance().loadImageKey(
            'gameover',
            '../../../assets/images/gameover.png'
        )
        ResourceManager.getInstance().loadImageKey('sprite', '../../../assets/images/sprite.png')
    }

    public update(deltaTime: number): void {
        super.update(deltaTime)
    }
}

export default PreloadScene

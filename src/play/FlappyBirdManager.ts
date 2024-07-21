import Engine from '../engine/Engine'
import MouseEventHandler from '../engine/controller/MouseEventHandler'
import SceneManager from '../engine/scene/SceneManager'
import OverScene from './scene/OverScene'
import PlayScene from './scene/PlayScene'
import PreloadScene from './scene/PreloadScene'
import ReadyScene from './scene/ReadyScene'

class FlappyBirdManager extends Engine {
    public setUp(): void {
        MouseEventHandler.getInstance().addEvent('mousedown')
        MouseEventHandler.getInstance().addEvent('mouseup')

        const preloadScene = new PreloadScene()
        const playScene = new PlayScene()
        const readyScene = new ReadyScene()
        const gameOverScene = new OverScene()
        SceneManager.getInstance().addScene('gamePlay', playScene)
        SceneManager.getInstance().addScene('ready', readyScene)
        SceneManager.getInstance().addScene('gameOver', gameOverScene)
        SceneManager.getInstance().getScene('preload').setIsActive(true)

        MouseEventHandler.getInstance().addScene(playScene)
        MouseEventHandler.getInstance().addScene(readyScene)
        MouseEventHandler.getInstance().addScene(gameOverScene)
        MouseEventHandler.getInstance().addScene(preloadScene)

        SceneManager.getInstance().getScene('ready').setIsActive(true)
    }
}

export default FlappyBirdManager

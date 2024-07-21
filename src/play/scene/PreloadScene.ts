import Scene from '../../engine/scene/Scene'
import SceneManager from '../../engine/scene/SceneManager'

class PreloadScene extends Scene {
    constructor() {
        console.log('Hi')

        super()
    }

    public async init(): Promise<void> {
        try {
            console.log('Hi')

            // await ResourceManager.getInstance().preloadImages(LIST_PATHS)
            SceneManager.getInstance().getScene('ready').setIsActive(true)
            SceneManager.getInstance().getScene('preload').setIsActive(false)
        } catch (error) {
            console.error('Failed to preload images:', error)
        }
    }
}

export default PreloadScene

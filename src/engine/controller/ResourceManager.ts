class ResourceManager {
    private static instance: ResourceManager = new ResourceManager()
    private mapImage: Map<string, HTMLImageElement>

    constructor() {
        this.mapImage = new Map<string, HTMLImageElement>()
    }

    public static getInstance(): ResourceManager {
        return this.instance
    }

    public loadImageKey(key: string, url: string): void {
        const image = new Image()
        image.src = url
        this.mapImage.set(key, image)
    }

    public getImageByKey(key: string): HTMLImageElement {
        return this.mapImage.get(key)!
    }

    public getMapImage(): Map<string, HTMLImageElement> {
        return this.mapImage
    }
}

export default ResourceManager

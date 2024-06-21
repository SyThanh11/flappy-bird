const LIST_PATHS = [
    '../../../assets/images/0.png',
    '../../../assets/images/1.png',
    '../../../assets/images/2.png',
    '../../../assets/images/3.png',
    '../../../assets/images/4.png',
    '../../../assets/images/5.png',
    '../../../assets/images/6.png',
    '../../../assets/images/7.png',
    '../../../assets/images/8.png',
    '../../../assets/images/9.png',
    '../../../assets/images/background-night.png',
    '../../../assets/images/background-day.png',
    '../../../assets/images/base.png',
    '../../../assets/images/gameover.png',
    '../../../assets/images/message.png',
    '../../../assets/images/pipe-green-down.png',
    '../../../assets/images/pipe-green.png',
    '../../../assets/images/sprite.png',
    '../../../assets/images/yellowbird-downflap.png',
    '../../../assets/images/yellowbird-midflap.png',
    '../../../assets/images/yellowbird-upflap.png',
];


class ResourceManager {
    private static instance: ResourceManager = new ResourceManager();
    private listImage: HTMLImageElement[] = [];
    private numberImage: Map<string, HTMLImageElement>;

    constructor(){
        this.listImage = [];
        this.numberImage = new Map<string, HTMLImageElement>();
        LIST_PATHS.forEach((path) => {
            this.loadImage(path);
        });
        for(let i = 0; i < 10; i++){
            this.numberImage.set(`${i}`, this.listImage[i]);
        }
    }

    public static getInstance(): ResourceManager {
        return this.instance;
    }

    public loadImage(url: string): void {
        const image = new Image();
        image.src = url;
        this.listImage.push(image);
    }

    public getImage(index: number): HTMLImageElement {
        return this.listImage[index];
    }

    public get length(): number {
        return this.listImage.length;
    }

    public getNumberImage(): Map<string, HTMLImageElement> {
        return this.numberImage;
    }
}

export default ResourceManager;
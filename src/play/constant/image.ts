const IMAGE_MAP: Map<string, HTMLImageElement> = new Map<string, HTMLImageElement>();
IMAGE_MAP.set('0', createImage('../../../assets/images/0.png'));
IMAGE_MAP.set('1', createImage('../../../assets/images/1.png'));
IMAGE_MAP.set('2', createImage('../../../assets/images/2.png'));
IMAGE_MAP.set('3', createImage('../../../assets/images/3.png'));
IMAGE_MAP.set('4', createImage('../../../assets/images/4.png'));
IMAGE_MAP.set('5', createImage('../../../assets/images/5.png'));
IMAGE_MAP.set('6', createImage('../../../assets/images/6.png'));
IMAGE_MAP.set('7', createImage('../../../assets/images/7.png'));
IMAGE_MAP.set('8', createImage('../../../assets/images/8.png'));
IMAGE_MAP.set('9', createImage('../../../assets/images/9.png'));

function createImage(path: string): HTMLImageElement {
    const image = new Image();
    image.src = path;
    return image;
}

export default IMAGE_MAP;

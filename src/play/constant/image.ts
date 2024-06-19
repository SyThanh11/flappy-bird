const imageMap: Map<string, HTMLImageElement> = new Map<string, HTMLImageElement>();
imageMap.set('0', createImage('../../../assets/images/0.png'));
imageMap.set('1', createImage('../../../assets/images/1.png'));
imageMap.set('2', createImage('../../../assets/images/2.png'));
imageMap.set('3', createImage('../../../assets/images/3.png'));
imageMap.set('4', createImage('../../../assets/images/4.png'));
imageMap.set('5', createImage('../../../assets/images/5.png'));
imageMap.set('6', createImage('../../../assets/images/6.png'));
imageMap.set('7', createImage('../../../assets/images/7.png'));
imageMap.set('8', createImage('../../../assets/images/8.png'));
imageMap.set('9', createImage('../../../assets/images/9.png'));

function createImage(path: string): HTMLImageElement {
    const image = new Image();
    image.src = path;
    return image;
}

export default imageMap;

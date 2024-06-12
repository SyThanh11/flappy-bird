class KeyAccess {
    public static readonly ARROW_LEFT = 37;
    public static readonly ARROW_UP = 38;
    public static readonly ARROW_RIGHT = 39;
    public static readonly ARROW_DOWN = 40;
    public static readonly SPACE = 32;

    public static keys: { [key: number]: boolean } = {};

    public static isKeyPressed(key: number): boolean {
        return this.keys[key];
    }
}

window.addEventListener('keydown', (event: KeyboardEvent) => {
    KeyAccess.keys[event.keyCode] = true;
})

window.addEventListener('keyup', (event: KeyboardEvent) => {
    delete KeyAccess.keys[event.keyCode];
})

export default KeyAccess;
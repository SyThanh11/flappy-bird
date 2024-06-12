class Physics {
    private gravity: number = 0.5;

    constructor(gravity: number) {
        this.gravity = gravity;
    }

    public applyGravity = (): void => {
        // sprite.velocity.y += this.gravity;
    }

    // getter
    public getGravity(): number {
        return this.gravity;
    }

    // setter
    public setGravity(gravity: number): void {
        this.gravity = gravity;
    }
}

export default Physics;
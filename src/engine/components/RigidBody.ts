class RigidBody {
    private mass: number
    private gravity: number

    constructor(mass: number, gravity: number) {
        this.mass = mass
        this.gravity = gravity
    }

    public getMass = (): number => {
        return this.mass
    }
    public getGravity = (): number => {
        return this.gravity
    }

    public getForce = (): number => {
        return this.getMass() * this.getGravity()
    }

    public getAcceleration = (): number => {
        return this.getForce() / this.getMass()
    }

    public destroy = (): void => {
        this.mass = 0
        this.gravity = 0
    }
}

export default RigidBody

class RigidBody {
    private mass: number
    private gravity: number

    constructor(mass: number, gravity: number) {
        this.mass = mass
        this.gravity = gravity
    }

    getMass = (): number => {
        return this.mass
    }
    getGravity = (): number => {
        return this.gravity
    }

    // Tính lực của đối tượng
    getForce = (): number => {
        return this.getMass() * this.getGravity()
    }

    // Tính gia tốc của đối tượng
    getAcceleration = (): number => {
        return this.getForce() / this.getMass()
    }

    // destroy
    destroy = (): void => {
        this.mass = 0
        this.gravity = 0
    }
}

export default RigidBody

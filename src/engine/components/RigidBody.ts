class RigidBody {
    private static instance: RigidBody | null = null; // Singleton
    private mass: number
    private gravity: number

    constructor(mass: number, gravity: number) {
        this.mass = mass
        this.gravity = gravity
    }

    public static getInstance(mass: number, gravity: number): RigidBody {
        if(!RigidBody.instance) {
            RigidBody.instance = new RigidBody(mass, gravity)
        }
        return RigidBody.instance
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

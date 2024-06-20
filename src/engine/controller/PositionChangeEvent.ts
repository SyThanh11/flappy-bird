import Vector2D from "../components/Vector2D";

class PositionChangeEvent {
    private listeners: ((position: Vector2D) => void)[] = [];

    public subscribe(listener: (position: Vector2D) => void): void {
        this.listeners.push(listener);
    }

    public notify(position: Vector2D): void {
        this.listeners.forEach(listener => listener(position));
    }
}

export default PositionChangeEvent;

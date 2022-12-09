import input from './input';

class RopePoint {
    name: string;
    x: number = 0;
    y: number = 0;
    history: { x: number, y: number }[] = [];

    constructor(name: string) {
        this.name = name;
        this.addToHistory();
    }

    move(step: string) {
        switch (step) {
            case 'U': this.y += 1; break;
            case 'R': this.x += 1; break;
            case 'D': this.y -= 1; break;
            case 'L': this.x -= 1; break;
        }
        this.addToHistory();
    }

    normalize(target: RopePoint): void {
        const delta = { x: target.x - this.x, y: target.y - this.y }

        if (Math.abs(delta.x) >= 2 || Math.abs(delta.y) >= 2) {

            if (delta.x === 0) {
                // move horizontally
                this.move(target.y - this.y > 0 ? 'U' : 'D')
            } else if (delta.y === 0) {
                // move vertically
                this.move(target.x - this.x > 0 ? 'R' : 'L')
            } else {
                this.x += delta.x >= 1 ? 1 : -1
                this.y += delta.y >= 1 ? 1 : -1
                this.addToHistory();
            }
        } else {
            this.addToHistory();
        }
    }

    addToHistory(): void {
        this.history.push({ x: this.x, y: this.y })
        console.log(this.toString());
    }

    uniqueLocationCount(): number {
        return Array.from(
            new Set(
                this.history.map(h => `${h.x},${h.y}`)
            )
        )
            .length
    }

    toString(): string {
        return `[${this.name}] ${this.x},${this.y}`
    }
}

const steps = input.split('\n')
    .map(command => command.split(' '))
    .map(([direction, units]) => direction.repeat(+units))
    .join('')

const head = new RopePoint('head')
const knots = Array.from(' '.repeat(9)).map((_, i) => new RopePoint(`knot ${i + 1}`))

Array.from(steps)
    .forEach((step: string) => {
        head.move(step)
        knots.forEach((knot, index) => knot.normalize(index === 0 ? head : knots[index - 1]))
    })

console.log(
    [head, ...knots].map(knot =>
        `[${knot.name}] ${knot.uniqueLocationCount()}`
    )
);

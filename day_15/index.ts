import input from './input';

enum Entity {
    SENSOR = 'S',
    BEACON = 'B',
}

let minX = Infinity, minY = Infinity, maxX = 0, maxY = 0;
const sensors: { x: number, y: number, distance: number }[] = [];
const grid: Record<string, Record<string, Entity | undefined>> = {};

// parse beacon signals to points on grid
input.split('\n')
    .map(text => text.match(/(-?\d+)/g)!.map(r => +r))
    .forEach(([x1, y1, x2, y2]) => {
        addEntity(Entity.SENSOR, x1, y1);
        addEntity(Entity.BEACON, x2, y2);

        const distance = dist(x1, y1, x2, y2);
        sensors.push({ x: x1, y: y1, distance });
        minX = Math.min(minX, x1 - distance, x2 - distance);
        maxX = Math.max(maxX, x1 + distance, x2 + distance);
    })


function addEntity(entity: Entity, x: number, y: number): void {
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
    if (!grid[y]) {
        grid[y] = {}
    }
    grid[y][x] = entity
}

function dist(x1: number, y1: number, x2: number, y2: number): number {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2)
}

function print(): void {
    const write = (str: string, color = '31') => process.stdout.write(`\x1b[${color}m${str}\x1b[0m`)
    // print headers
    for (let y = minY; y < String(maxX).length; y++) {
        write(''.padStart(String(maxY).length + 1, ' '))
        for (let x = minX; x <= maxX; x++) {
            write(String(x).padStart(String(maxX).length, ' ').charAt(y), '30')
        }
        write('\n');
    }

    // print rows
    for (let y = Math.max(minY, 0); y <= maxY; y++) {
        grid[y] = grid[y] ?? {}
        write(String(y).padStart(String(maxY).length), '30'); write(' ')
        for (let x = minX; x <= maxX; x++) {
            switch (grid[y][x]) {
                case Entity.SENSOR: write('S', '32'); break;
                case Entity.BEACON: write('B', '36'); break;
                default: {
                    if (sensors.some(s => dist(s.x, s.y, x, y) <= s.distance)) {
                        write('x', '31');
                    } else {
                        write('.', '37')
                    }
                }
            }
        }
        write('\n')
    }
}

// part 1
const target = 2000000
// print();

let count = 0;
if (!grid[target]) grid[target] = {}
for (let x = minX; x <= maxX; x++) {
    if (!grid[target][x] && sensors.some(s => dist(s.x, s.y, x, target) <= s.distance)) count++
}
console.log('Part 1', count);

// part 2
let found = false
for (let y = 0; y <= 4000000; y++) {
    grid[y] = grid[y] ?? {}
    if (found) break;
    for (let x = 0; x <= 4000000; x++) {
        let sensor = sensors.find(s => dist(s.x, s.y, x, y) <= s.distance)
        if (sensor) {
            x = sensor.x + sensor.distance - Math.abs(sensor.y - y)
        } else {
            console.log('Part 2', (x * 4000000) + y);
            found = true;
            break;
        }
    }
}



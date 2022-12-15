import input from './input';

enum Entity {
    ROCK = '#',
    SAND = '+',
}

const cave: Record<string, Record<string, string | undefined>> = {}
let minX = Infinity, minY = 0, maxX = 0, maxY = 0

input
    .split('\n')
    .map(row => row.split('->').map(c => c.trim()))
    .forEach((row: string[]) => {
        row.forEach((range, index) => {
            if (index > 0) {
                populateRange(row[index - 1], range)
            }
        })
    })

function populateRange(lower, upper): void {
    const [x1, y1] = lower.split(',').map(Number)
    const [x2, y2] = upper.split(',').map(Number)

    minX = Math.min(minX, x1, x2)
    maxX = Math.max(maxX, x1, x2)
    maxY = Math.max(maxY, y1, y2)

    for (let i = Math.min(x1, x2); i <= Math.max(x1, x2); i++) {
        if (!cave[i]) {
            cave[i] = {};
        }
        for (let j = Math.min(y1, y2); j <= Math.max(y1, y2); j++) {
            cave[i][j] = Entity.ROCK;
        }
    }
}

// populate remaining with space
for (let x = minX; x <= maxX; x++) {
    if (!cave[x]) cave[x] = {}
    for (let y = minY; y <= maxY; y++) {
        if (!cave[x][y]) {
            cave[x][y];
        }
    }
    cave[x][maxY + 2] = Entity.ROCK;
}

maxY += 2; // part 2 addition

function pour(): void {
    if (cave[500][0]) return;

    let y = 0
    for (y; y <= maxY; y++) {
        if (cave[500][y]) {
            y--; break;
        }
    }

    if (y >= 0 && !cave[500][y]) {
        const landing = runoff(500, y);

        if (landing !== null) {
            cave[landing.x][landing.y] = Entity.SAND;
        }
    }
}

function runoff(x: number, y: number): { x: number, y: number } | null {
    while (y <= maxY) {
        if (!cave[x][y + 1] && y + 1 <= maxY) {
            y += 1;
        } else if ((!cave[x - 1] || !cave[x - 1][y + 1]) && y + 1 < maxY) {
            cave[x - 1] = cave[x - 1] ?? { [maxY]: Entity.ROCK }
            minX = Math.min(minX, x - 1)
            x -= 1
            y += 1;
        } else if ((!cave[x + 1] || !cave[x + 1][y + 1]) && y + 1 < maxY) {
            cave[x + 1] = cave[x + 1] ?? { [maxY]: Entity.ROCK }
            maxX = Math.max(maxX, x + 1)
            x += 1
            y += 1;

        } else {
            break;
        }
    }

    if (cave[x][y]) {
        return null;
    } else {
        return { x, y }
    }
}

function print(): void {
    // print headers
    for (let y = 0; y < String(maxX).length; y++) {
        write(''.padStart(String(maxY).length + 1, ' '))
        for (let x = minX; x <= maxX; x++) {
            write(String(x).charAt(y), '30')
        }
        write('\n');
    }

    // print rows
    for (let y = minY; y <= maxY; y++) {
        write(String(y).padStart(String(maxY).length), '30'); write(' ')
        for (let x = minX; x <= maxX; x++) {
            switch (cave[x][y]) {
                case Entity.SAND: write('o', '32'); break;
                case Entity.ROCK: write('#', '2'); break;
                default: write('.', '37'); break;
            }
        }
        write('\n')
    }
}

function write(str: string, color = '31'): void {
    process.stdout.write(`\x1b[${color}m${str}\x1b[0m`)
}

console.time('pour')
let count = 0;
console.log(cave[500]);

while (!cave[500][0]) {
    pour();
    count++;
}
console.log('Pours:', count);
console.timeEnd('pour')
print(); // 160ms

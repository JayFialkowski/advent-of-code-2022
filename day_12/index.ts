import input from './input';

class Tile {
    elevation: string;
    x: number;
    y: number;

    previous?: Tile
    neighbors: Tile[] = []

    distance = Infinity

    start = false;
    destination = false;

    get id(): string {
        return `${this.x},${this.y}`
    }

    constructor(elevation: string, x: number, y: number) {
        this.x = x;
        this.y = y;

        if (elevation === 'S') {
            this.elevation = 'a';
            this.start = true;
        } else if (elevation === 'E') {
            this.elevation = 'z';
            this.destination = true;
        } else {
            this.elevation = elevation;
        }
    }

    public toString(): string {
        return `[${this.id}] ${this.elevation} (${this.neighbors.length} neighbors) (distance ${this.distance}) prev (${this.previous?.id})`;
    }

    public equals(tile: Tile): boolean {
        return tile.x === this.x && tile.y === this.y;
    }
}
const tiles: Tile[] = [];

// add all tiles to list
input.split('\n').forEach((row: string, y: number) => Array.from(row).forEach((char: string, x: number) => tiles.push(new Tile(char, x, y))));

// identify tile neighbors
tiles.forEach((tile: Tile) =>
    tile.neighbors = tiles.filter(target => {
        const deltaX = Math.abs(target.x - tile.x), deltaY = Math.abs(target.y - tile.y)
        const diff = target.elevation.charCodeAt(0) - tile.elevation.charCodeAt(0)

        return (deltaX === 1 && tile.y === target.y || deltaY === 1 && tile.x === target.x) && diff <= 1
    })
)

function explore(start: Tile): number {
    const _tiles = [...tiles]
    _tiles.forEach((tile: Tile) => {
        tile.distance = Infinity
        tile.previous = undefined;
        tile.start = tile.equals(start)
    })
    _tiles.find(t => t.start)!.distance = 0

    while (_tiles.length > 0) {

        _tiles.sort((a, b) => a.distance === b.distance ? 0 : a.distance < b.distance ? 1 : -1)

        const tile = _tiles.pop()!
        tile.neighbors.forEach((neighbor: Tile) => {
            const distance = tile.distance + 1
            if (distance < neighbor.distance) {
                neighbor.distance = distance
                neighbor.previous = tile
            }
        })
    }

    return tiles.find(t => t.destination)?.distance ?? -1
}

function explore2(): number {
    const starts = tiles.filter(t => t.elevation == 'a')
    return Math.min(...starts.map(explore))
}


console.log('Explore 1:', explore(tiles.find(t => t.start)!))
console.log('Explore 2:', explore2());

// print()

function print() {
    console.clear()
    console.log('\n\n')
    const history: Tile[] = []
    let tile: Tile | undefined = tiles.find(t => t.destination)!
    while (tile) {
        history.push(tile);
        tile = tile.previous
    }
    const width = Math.max(...tiles.map(tile => tile.x));
    tiles.forEach((tile: Tile) => {
        if (history.some(h => h.equals(tile))) process.stdout.write(colorVisited(tile.elevation))
        else process.stdout.write(colorInactive(tile.elevation))

        if (tile.x === width) process.stdout.write('\n')
    })
}

function colorInactive(str: string): string {
    return `\x1b[30m${str}\x1b[89m`
}
function colorVisited(str: string): string {
    return `\x1b[34m${str}\x1b[89m`
}
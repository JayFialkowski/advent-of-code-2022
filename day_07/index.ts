const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf8') as string

type FileType = 'dir' | 'file';

class FileNode {

    parent: FileNode | null
    label!: string;
    type!: FileType;
    private _size: number
    children!: Array<FileNode>;

    get decorator(): string {
        if (this.type === 'dir') {
            return this.type
        } else {
            return `${this.type}, size=${this._size}`
        }
    }

    get size(): number {
        return this._size + this.children.reduce((total, curr) => total + curr.size, 0)
    }

    constructor(parent: FileNode | null, label: string, type: FileType, size?: number) {
        this.parent = parent;
        this.label = label
        this.type = type;
        this._size = size ?? 0;
        this.children = [];
    }

    public add(label: string, type: FileType, size?: number): void {
        const node = new FileNode(this, label, type, size);
        this.children.push(node);
    }

    public print(depth = 0): void {
        console.log(''.padStart(depth * 2), `- ${this.label} (${this.decorator})`)
        this.children?.forEach(child => child.print(depth + 1))
    }
}

const root = new FileNode(null, '/', 'dir')
let pointer = root;

for (let line of input.split('\n')) {

    if (line.startsWith('$')) {
        const params = line.split(' ');

        switch (params[1]) {
            case 'cd':
                movePointer(params[2])
                break;
            case 'ls':
                break;
            default:
                throw new Error(`unknown command: '${params[1]}'`)
        }
    } else {
        parseIntel(line)
    }
}

function movePointer(destination: string): void {
    switch (destination) {
        case '/':
            pointer = root
            break;
        case '..':
            pointer = pointer.parent!
            break;
        default:
            pointer = pointer.children.find(child => child.label === destination)!
            break;
    }
}

function parseIntel(line: string): void {
    const fileMatch = line.match(/^(\d+) (.+)$/);
    const dirMatch = line.match(/^dir (.+)$/);
    if (fileMatch) {
        pointer.add(fileMatch[2], 'file', Number.parseInt(fileMatch[1]))
    } else if (dirMatch) {
        pointer.add(dirMatch[1], 'dir')
    }
}



let temp = 0;

function doProcess(node: FileNode): number {
    console.log(node.size);
    return Math.min(node.size, ...node.children.filter(child => child.type === 'dir').filter(dir => dir.size > 8381165).map(child => doProcess(child)))
}

console.log(doProcess(root))
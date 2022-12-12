import input from './input';

const commands = input.split('\n')
    .map((command: string) => command === 'noop' ? [command] : ['noop', command])
    .reduce((arr, curr) => [...arr, ...curr], []) as Array<string>

let x = 1
const strengths = commands.map((command: string, index: number) => {
    const start = x
    const match = command.match(/^addx (-?\d+)$/)
    if (match) x += Number.parseInt(match[1])
    return start
})

strengths.forEach((sprite: number, index: number) => {
    const collision = Math.abs(sprite - (index % 40)) < 2
    process.stdout.write(collision ? '#' : ' ')
    if ((index + 1) % 40 === 0) process.stdout.write('\n')
})

// PGPHBEAB
const fs = require('fs');
const [crates, commands] = fs.readFileSync('./input.txt', 'utf8').split('\n\n').map((section: string) => section.split('\n'))

crates.pop() // don't care about the numbers tbh

const stacks = crates.reduce((stack: string[][], curr: string) => {
    const columns = curr.match(/(.{3})\s?/g)

    columns?.map((col: string) => col.replace(/[\[\]\s]/g, '')).forEach((col: string, i: number) => {
        if (stack[i]) stack[i].push(col)
        else stack[i] = [col]
        stack[i] = stack[i].filter(Boolean)
    })
    return stack
}, [])

console.log(stacks);


commands
    .map((command: string) => command.match(/(\d+)/ig)?.map(num => Number.parseInt(num)))
    .forEach(([count, from, to]: number[]) => {
        const cratesToMove = stacks[from - 1].slice(0, count)

        stacks[from - 1] = stacks[from - 1].slice(count)
        stacks[to - 1] = cratesToMove.concat(...stacks[to - 1])
    })

console.log(stacks.map((stack: string[]) => stack[0]).join(''));
const fs = require('fs');
const sacks = fs.readFileSync('./input.txt', 'utf8').split('\n')

const offset = 'a'.charCodeAt(0);

const groups = sacks.reduce((arr: string[][][], curr: string[], index: number) => {
    const i = Math.floor(index / 3)

    if (arr[i]) {
        arr[i].push(curr);
    } else {
        arr[i] = [curr]
    }
    return arr
}, [])

console.log(
    groups
        .map((group: string[]) => Array.from(group[0]).find((char: string) => group[1].includes(char) && group[2].includes(char)))
        .map((item: string) => item.charCodeAt(0) - offset + 1)
        .map((val: number) => val > 0 ? val : val + (offset - 'A'.charCodeAt(0)) + 26)
        .reduce((sum: number, curr: number) => sum + curr, 0)
)

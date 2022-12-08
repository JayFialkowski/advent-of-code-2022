const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf8') as string

const count = 14
let result = -1;

for (let i = 0; i < input.length - count - 1; i++) {
    let substring = input.substring(i, i + count) as string

    const valid = Array.from(substring).every((char: string) => substring.match(new RegExp(`${char}`, 'g'))!.length <= 1)

    if (valid) {
        result = i + count
        break;
    }
}

console.log('result', result)
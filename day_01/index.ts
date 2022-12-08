const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf8');

const weights = input.split("\n\n")
    .map((elf: string) => elf.split('\n'))
    .map((elf: string[]) => elf.reduce((sum: number, food: string) => sum + Number.parseInt(food), 0))

weights.sort((a: number, b: number) => a < b ? 1 : -1);

console.log(weights.splice(0, 3).reduce((sum: number, weight: number) => sum + weight, 0))
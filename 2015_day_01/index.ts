import { input } from './input.json';

function part1(): number {
    return input.split('(').length - input.split(')').length;
}

function part2(): number {
    const steps = Array.from(input).reverse();
    let floor = 0;

    while (floor >= 0 && steps.length) {
        floor += steps.pop() === '(' ? 1 : -1;
    }
    return input.length - steps.length;
}

console.log(part1());
console.log(part2());

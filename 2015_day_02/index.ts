import { input } from './input';
import _ from 'lodash';

const packages = input.split('\n')

function sqFtRequired(input: string): number {
    const [l, w, h] = input.split('x').map(i => +i);
    return ((2 * l * w) + (2 * w * h) + (2 * h * l)) + Math.min(l * w, w * h, h * l)
}

function ribbonRequired(input: string): number {
    const [x, y, z] = input.split('x').map(i => +i).sort((a, b) => a > b ? 1 : -1);
    return  (2 * x) + (2 * y) + (x * y * z)
}

// part 1
console.log(_.sum(packages.map(sqFtRequired)))

// part 2
console.log(_.sum(packages.map(ribbonRequired)))

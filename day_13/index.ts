import input from './input';

const pairs = input.split('\n\n').map(pair => pair.split('\n')).map(([_left, _right]) => [JSON.parse(_left), JSON.parse(_right)])

type Signal = number | Array<Signal>

const results = pairs.map(([left, right]) => compare(left, right) <= 0 ? true : false)

function compare(a: Signal, b: Signal): number {
    if (b === undefined) return 1
    if (typeof a === 'number' && typeof b === 'number') {
        return a === b ? 0 : a < b ? -1 : 1
    } else if (Array.isArray(a) && Array.isArray(b)) {
        const comparisons = a.map((_a, index) => b[index] === undefined ? 1 : compare(_a, b[index]))
        if (comparisons.every(c => c === 0)) {
            return a.length === b.length ? 0 : a.length < b.length ? -1 : 1
        } else {
            return comparisons.find(c => c !== 0)!
        }
    } else {
        return Array.isArray(a) ? compare(a, [b]) : compare([a], b)
    }
}

console.log('Part 1', results.reduce((accum, curr, index: number) => accum + (curr ? (index + 1) : 0), 0))

const dividers = [[[2]], [[6]]]
const _pairs = pairs.reduce((arr, curr) => arr.concat(curr), [...dividers])
_pairs.sort((a, b) => compare(a, b))


console.log(
    _pairs.reduce((accum, curr, i) => {
        const match = dividers.map(d => JSON.stringify(d)).some(d => d == JSON.stringify(curr))
        return match ? accum * (i + 1) : accum
    }, 1)
);


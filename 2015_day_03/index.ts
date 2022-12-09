import input from './input';
import _ from 'lodash';

const map = {'0,0': 1}
let x = [0,0], y = [0,0];

Array.from(input).forEach((direction: string, index) => {
    const i = index%2
    switch (direction) {
        case '^':
            y[i] += 1
            break
        case '>':
            x[i] += 1
            break
        case 'v':
            y[i] -= 1
            break
        case '<':
            x[i] -= 1
            break
    }

    const key = `${x[i]},${y[i]}`
    map[key] = map[key] ? map[key] + 1 : 1
})

console.log(map);

console.log(Object.values(map).filter((value: number) => value > 0).length)

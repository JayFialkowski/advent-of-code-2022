const fs = require('fs');
const rounds = fs.readFileSync('./input.txt', 'utf8').split('\n')

const convert = (input: number) => {
    switch (input) {
        case 1: return 'rock';
        case 2: return 'paper'
        case 3: return 'scissors'
        default: return 'unknown'
    }
}

const weakness = (move: number) => (move % 3) + 1 // what beats this move?
const strength = (move: number) => {
    const v = (((move - 2) % 3) + 1)
    return v === 0 ? 3 : v
}

const score = rounds
    .map((round: string) => round.split(' '))
    .map(([a, b]: [string, string]) => [(a.charCodeAt(0) % 'A'.charCodeAt(0)) + 1, (b.charCodeAt(0) % 'X'.charCodeAt(0)) + 1])
    .map(([a, b]: [number, number]) => {

        switch (b) {
            case 1:
                return strength(a);
            case 2:
                return a + 3;
            case 3:
                return 6 + weakness(a);

        }
    }).reduce((sum: number, curr: number) => sum + curr, 0)

console.log(score)



/*
A | X = ROCK 1 < 2
B | Y = PAPER 2 < 3
C | Z = SCISSORS 3 < 1
*/
const fs = require('fs');
const pairs = fs.readFileSync('./input.txt', 'utf8').split('\n')

const result = pairs
    .map((pair: string) => pair.split(','))
    .filter((pair: string[]) => {
        const aLower = Number.parseInt(pair[0].split('-')[0])
        const aUpper = Number.parseInt(pair[0].split('-')[1])
        const bLower = Number.parseInt(pair[1].split('-')[0])
        const bUpper = Number.parseInt(pair[1].split('-')[1])

        return (aLower <=bLower && aUpper >= bLower) || (bLower <= aLower && bUpper >= aLower)

        // console.log(aLower, aUpper, bLower, bUpper);
        // return (aLower <= bLower && aUpper >= bUpper) || (bLower <= aLower && bUpper >= aUpper)
    })

console.log(result.length);
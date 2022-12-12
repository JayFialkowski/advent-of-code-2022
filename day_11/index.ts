import input from './input';
import _ from 'lodash';

class Monkey {
    items: number[];
    divisor: number;
    inspections = 0;
    inspect: (worry: number) => number;
    test: (worry: number, monkeys: Monkey[]) => void;


    constructor(input: string) {
        const detail = input.split('\n');
        this.items = detail[1].match(/(\d+)/g)!.map(i => +i);
        this.divisor = +detail[3].match(/(\d+)/g)![0];

        this.inspect = (worry: number) => {
            this.inspections++;

            const tokens = detail[2].split('=')[1].trim().split(' ');
            const op1 = tokens[0] === 'old' ? worry : +tokens[0];
            const op2 = tokens[2] === 'old' ? worry : +tokens[2];

            switch (tokens[1]) {
                case '+': return op1 + op2;
                case '*': return op1 * op2;
                default: return worry;
            }
        }

        this.test = (worry: number, monkeys: Monkey[]) => {
            const CONSTANT = monkeys.reduce((accum, monkey) => accum * monkey.divisor, 1);
            const operand = +detail[3].match(/(\d+)/g)![0];
            const monkey = +detail[!(worry % operand) ? 4 : 5].match(/(\d+)/g)![0];
            monkeys[monkey].items.push(worry % CONSTANT);
        }
    }
}

const monkeys = input.split('\n\n').map((chunk: string) => new Monkey(chunk));

for (let i = 0; i < 10000; i++) {
    monkeys.forEach((monkey: Monkey) => {
        monkey.items = monkey.items.map(item => monkey.inspect(item));
        monkey.items.forEach(item => monkey.test(item, monkeys));
        monkey.items = [];
    })
}

monkeys.forEach((monkey: Monkey) => console.log(`Monkey ${monkey.id} inspected items ${monkey.inspections} times.`));

console.log(
    _.multiply(
        ...monkeys
            .map(monkey => monkey.inspections)
            .sort((a, b) => a > b ? -1 : 1).slice(0, 2)
    )
);
export async function day3() {
    const path = "day-3/input.txt";
    const file = await Bun.file(path).text();

    const allString = file.split('\n').join('');
    const valuesStrings = allString.split('mul(');

    let total = 0;

    for (const value of valuesStrings) {
        const possibleNumbers = value.substring(0, value.indexOf(')')).split(',');
        if (possibleNumbers.length !== 2) continue;

        if (!isNumberString(possibleNumbers[0]) || !isNumberString(possibleNumbers[1])) continue;

        const num1 = parseInt(possibleNumbers[0]);
        const num2 = parseInt(possibleNumbers[1]);

        total += num1 * num2;
    }

    console.log(total);
}

const NUMBERS = '1234567890';

function isNumberString(str: string): boolean {
    return str.split('').every(c => NUMBERS.includes(c));
}

export async function day3_2() {
    const path = "day-3/input.txt";
    const file = await Bun.file(path).text();

    const allString = file.split('\n').join('');

    let total = 0;

    const DONT = 'don\'t()';
    const DO = 'do()';

    const dontIndexes = occurrencesIndexes(allString, DONT);
    const doIndexes = occurrencesIndexes(allString, DO);

    let filteredString = allString;
    let amountRemoved = 0;

    let lastDo = 0;

    for (const dontIndex of dontIndexes) {
        const firstDoIndex = doIndexes.find(i => i > dontIndex);

        if (!firstDoIndex) {
            // Borram fins al final
            filteredString = filteredString.slice(0, dontIndex - amountRemoved);
            break;
        }

        if (dontIndex < lastDo) continue;
        lastDo = firstDoIndex;

        // Borrar un slice desde dontIndex a firstDoIndex
        filteredString = filteredString.slice(0, dontIndex - amountRemoved) +
            filteredString.slice(firstDoIndex + DO.length - amountRemoved);

        amountRemoved += (firstDoIndex + DO.length) - dontIndex;
    }

    const valuesStrings = filteredString.split('mul(');

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

function occurrencesIndexes(str: string, findStr: string): number[] {
    const occurrences = [];

    let strLeft = str;

    while (strLeft.length > 0) {
        const index = strLeft.indexOf(findStr);
        if (index === -1) break;
        occurrences.push(index + (str.length - strLeft.length));
        strLeft = strLeft.substring(index + findStr.length);
    }

    return occurrences;
}

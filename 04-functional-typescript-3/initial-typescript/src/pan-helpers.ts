export function containsOnlyNumbers(text: string) {
    return /^\d+$/.test(text);
}

export type StringRange = { lower: string; upper: string; };
function textStartsWithRange(text: string, range: StringRange) {
    const x = text.slice(0, range.upper.length);
    return x >= range.lower && x <= range.upper;
}

export function textStartsWithAnyRange(text: string, ranges: StringRange[]) {
    return ranges.some((range, _index, _arr) => textStartsWithRange(text, range));
}
function calcLuhnCheckDigit(text: string) {
    const sum = text
        .split("")
        .map(Number)
        .reverse()
        .map(function (digit, index) {
            if (index % 2 === 0) {
                return digit * 2;
            } else {
                return digit;
            }
        })
        .map(function (digit) {
            if (digit > 9) {
                return digit - 9;
            } else {
                return digit;
            }
        })
        .reduce(function (total, current) {
            return total + current;
        });

    return (10 - (sum % 10)) % 10;
}

export function luhnCheck(text: string) {
    const testCheckDigit = Number(text.slice(-1));
    const payload = text.slice(0, -1);

    const actualCheckDigit = calcLuhnCheckDigit(payload);

    return testCheckDigit === actualCheckDigit;
}

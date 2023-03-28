import { Result } from "./utility";

export function containsOnlyNumbers(text: string): Result<string> {
    if (/^\d+$/.test(text)) {
        return Result.ok(text);
    } else {
        return Result.error("PAN can only contain numbers");
    }
}

export function isMastercardLength(text: string): Result<string> {
    if ((text.length === 16)) {
        return Result.ok(text);
    } else {
        return Result.error("PAN should be 16 digits");
    }
}

type StringRange = { lower: string; upper: string; };

function textStartsWithRange(text: string, range: StringRange) {
    const x = text.slice(0, range.upper.length);
    return x >= range.lower && x <= range.upper;
}

function textStartsWithAnyRange(text: string, ranges: StringRange[]) {
    return ranges.some((range, _index, _arr) => textStartsWithRange(text, range));
}

export function textStartsWithMastercardDigits(text: string): Result<string> {
    const mastercardStartWith =
        [{ lower: '2221', upper: '2720' }, { lower: '51', upper: '55' }];

    if (textStartsWithAnyRange(text, mastercardStartWith)) {
        return Result.ok(text);
    } else {
        return Result.error("PAN is not a Mastercard");
    }
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

export function luhnCheck(text: string): Result<string> {
    const testCheckDigit = Number(text.slice(-1));
    const payload = text.slice(0, -1);

    const actualCheckDigit = calcLuhnCheckDigit(payload);

    if (testCheckDigit === actualCheckDigit) {
        return Result.ok(text);
    } else {
        return Result.error("Invalid PAN");
    }
}

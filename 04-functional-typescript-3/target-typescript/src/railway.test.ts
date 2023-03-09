import { describe, expect, it } from "vitest";

// Attempt 1
// Utility functions

function removeWhiteSpace(text: string) {
    return text.replace(/\s+/g, "");
}

function containsOnlyNumbers(text: string) {
    return /^\d+$/.test(text);
}

function textStartsWithRange(text: string, lower: string, upper: string) {
    const x = text.slice(0, upper.length);
    return x >= lower && x <= upper;
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

function luhnCheck(text: string) {
    const testCheckDigit = Number(text.slice(-1));
    const payload = text.slice(0, -1);

    const actualCheckDigit = calcLuhnCheckDigit(payload);

    return testCheckDigit === actualCheckDigit;
}

describe("utility functions 1", () => {
    it("should remove white space", () => {
        const result = removeWhiteSpace(" Hello, World! ");

        expect(result).eq("Hello,World!");
    });

    it("should be true when only numbers", () => {
        const result = containsOnlyNumbers("1234567890");

        expect(result).eq(true);
    });

    it("should be false when contains non-numeric", () => {
        const result = containsOnlyNumbers("1234567890a");

        expect(result).eq(false);
    });

    it("should be true when inside range", () => {
        const result = textStartsWithRange("2221053", "2221", "2720");

        expect(result).eq(true);
    });

    it("should be false when outside range", () => {
        const result = textStartsWithRange("2220052", "2221", "2720");

        expect(result).eq(false);
    });

    it("should calculate Luhn check digit", () => {
        const result = calcLuhnCheckDigit("914");

        expect(result).eq(2);
    });

    it("should pass Luhn check", () => {
        const result = luhnCheck("9142");

        expect(result).eq(true);
    });

    it("should fail Luhn check", () => {
        const result = luhnCheck("9141");

        expect(result).eq(false);
    });
});

// Attempt 2

// Infrastructure types

type StringRange = { lower: string, upper: string }

// Utility functions

function textStartsWithRange2(text: string, range: StringRange) {
    const x = text.slice(0, range.upper.length);
    return x >= range.lower && x <= range.upper;
}

function textStartsWithAnyRange(text: string, ranges: StringRange[]) {
    return ranges.some((range, _index, _arr) => textStartsWithRange2(text, range));
}

describe("utility functions 2", () => {
    it("should be true when inside range", () => {
        const range = { lower: '2221', upper: '2720' };

        const result = textStartsWithRange2("22211234", range);

        expect(result).eq(true);
    });

    it("should be false when outside range", () => {
        const range = { lower: '2221', upper: '2720' };

        const result = textStartsWithRange2("22201234", range);

        expect(result).eq(false);
    });

    it("should be true when inside one of the ranges", () => {
        const range1 = { lower: '51', upper: '55' };
        const range2 = { lower: '2221', upper: '2720' };
        const ranges = [range1, range2];

        const result = textStartsWithAnyRange("5112345", ranges);

        expect(result).eq(true);
    });

    it("should be false when outside all of the ranges", () => {
        const range1 = { lower: '51', upper: '55' };
        const range2 = { lower: '2221', upper: '2720' };
        const ranges = [range1, range2];

        const result = textStartsWithAnyRange("5012345", ranges);

        expect(result).eq(false);
    });
});

// Attempt 3

// Infrastructure types

type Ok<T> = { kind: 'resultOk', value: T }
type Error = { kind: 'resultError', message: string }
type Result<T> = Ok<T> | Error

function okResult<T>(value: T): Result<T> {
    return { kind: 'resultOk', value: value };
}

function errorResult(message: string): Result<any> {
    return { kind: 'resultError', message: message };
}

// Utility functions

function removeWhiteSpace2(text: string) {
    return okResult(text.replace(/\s+/g, ""));
}

function validateContainsOnlyNumbers(text: string): Result<string> {
    if (containsOnlyNumbers(text)) {
        return okResult(text);
    } else {
        return errorResult("PAN can only contain numbers");
    }
}

function validateLength(text: string): Result<string> {
    if (text.length === 16) {
        return okResult(text);
    } else {
        return errorResult("PAN should be 16 digits");
    }
}

function validateMastercard(text: string): Result<string> {
    const mastercardStartWith = [{ lower: '2221', upper: '2720' }, { lower: '51', upper: '55' }];

    if (textStartsWithAnyRange(text, mastercardStartWith)) {
        return okResult(text);
    } else {
        return errorResult("PAN is not a Mastercard");
    }
}

function validateLuhn(text: string): Result<string> {
    if (luhnCheck(text)) {
        return okResult(text);
    } else {
        return errorResult("Invalid PAN");
    }
}

describe("utility functions 3", () => {
    it("should be Ok when only numbers", () => {
        const pan = "1234567890";

        const result = validateContainsOnlyNumbers(pan);

        expect(result).toStrictEqual(okResult(pan));
    });

    it("should be Error when contains non-numeric", () => {
        const pan = "1234567890a";

        const result = validateContainsOnlyNumbers(pan);

        expect(result).toStrictEqual(errorResult("PAN can only contain numbers"));
    });

    it("should be Ok when length is 16", () => {
        const pan = "1111222211112222";

        const result = validateLength(pan);

        expect(result).toStrictEqual(okResult(pan));
    });

    it("should be Error when length is 15", () => {
        const pan = "111122221111222";

        const result = validateLength(pan);

        expect(result).toStrictEqual(errorResult("PAN should be 16 digits"));
    });

    it("should be Error when length is 17", () => {
        const pan = "11112222111122221";

        const result = validateLength(pan);

        expect(result).toStrictEqual(errorResult("PAN should be 16 digits"));
    });

    it("should be Ok when inside one of the ranges", () => {
        const pan = "5112345";

        const result = validateMastercard(pan);

        expect(result).toStrictEqual(okResult(pan));
    });

    it("should be false when outside all of the ranges", () => {
        const pan = "5012345";

        const result = validateMastercard(pan);

        expect(result).toStrictEqual(errorResult("PAN is not a Mastercard"));
    });

    it("should pass Luhn check", () => {
        const pan = "9142";

        const result = validateLuhn(pan);

        expect(result).toStrictEqual(okResult(pan));
    });

    it("should fail Luhn check", () => {
        const pan = "9141";

        const result = validateLuhn(pan);

        expect(result).toStrictEqual(errorResult("Invalid PAN"));
    });
});

// canonicalization - remove white space
// validation - PAN can only contain numbers
// validation - PAN should contain 16 digits
// validation - PAN should start with 2221-2720 or 51-55
// validation - Luhn check

function process3(pan: string) {
    let result = removeWhiteSpace2(pan);

    switch (result.kind) {
        case "resultError":
            return result;
        case "resultOk":
            result = validateContainsOnlyNumbers(result.value);

            switch (result.kind) {
                case "resultError":
                    return result;
                case "resultOk":
                    result = validateLength(result.value);

                    switch (result.kind) {
                        case "resultError":
                            return result;
                        case "resultOk":
                            result = validateMastercard(result.value);

                            switch (result.kind) {
                                case "resultError":
                                    return result;
                                case "resultOk":
                                    result = validateLuhn(result.value);

                                    return result;
                            }
                    }
            }
    }
}

describe("Process 3", () => {
    it("It works!", () => {
        let pan = "5555 4444 3333 2226";

        let result = process3(pan);

        expect(result).toStrictEqual(okResult("5555444433332226"));
    });
});

// Attempt 4

// Infrastructure types

namespace Result {
    type Bind =
        <T>(fn: (arg: T) => Result<T>) =>
            (arg2: Result<T>) => Result<T>

    export const bind: Bind =
        (fn) =>
            arg2 => {
                switch (arg2.kind) {
                    case "resultError":
                        return arg2;
                    case "resultOk":
                        return (fn(arg2.value));
                }
            }
}

// canonicalization - remove white space
// validation - PAN can only contain numbers
// validation - PAN should contain 16 digits
// validation - PAN should start with 2221-2720 or 51-55
// validation - Luhn check

function process4(pan: string) {
    const canonicalized = removeWhiteSpace2(pan);

    const v1 = Result.bind(validateContainsOnlyNumbers);
    const v2 = Result.bind(validateLength);
    const v3 = Result.bind(validateMastercard);
    const v4 = Result.bind(validateLuhn);

    return v4(v3(v2(v1(canonicalized))));
}

describe("Process 4", () => {
    it("It works!", () => {
        let pan = "5555 4444 3333 2226";

        let result = process4(pan);

        expect(result).toStrictEqual(okResult("5555444433332226"));
    });
});

// Attempt 5

// Infrastructure types

type Compose =
    <T1, T2, U>(fn1: (arg: T1) => T2, fn2: (fn2Arg: T2) => U) =>
        (arg: T1) =>
            U;

const compose: Compose =
    (fn1, fn2) =>
        value =>
            fn2(fn1(value));

// canonicalization - remove white space
// validation - PAN can only contain numbers
// validation - PAN should contain 16 digits
// validation - PAN should start with 2221-2720 or 51-55
// validation - Luhn check

function process5(pan: string) {
    const canonicalized = removeWhiteSpace2(pan);

    const v1 = Result.bind(validateContainsOnlyNumbers);
    const v2 = Result.bind(validateLength);
    const v3 = Result.bind(validateMastercard);
    const v4 = Result.bind(validateLuhn);

    const validator =
        compose(
            compose(
                compose(v1, v2), v3), v4);

    return validator(canonicalized);
}

describe("Process 5", () => {
    it("It works!", () => {
        let pan = "5555 4444 3333 2226";

        let result = process5(pan);

        expect(result).toStrictEqual(okResult("5555444433332226"));
    });
});

// Attempt 6

// Infrastructure types

type ComposeMany =
    <T>(fns: ((arg: T) => T)[]) =>
        (arg: T) =>
            T;

const composeMany: ComposeMany =
    (fns) =>
        fns.reduce((agg, cur, _currentIndex, _array) => compose(agg, cur));

// canonicalization - remove white space
// validation - PAN can only contain numbers
// validation - PAN should contain 16 digits
// validation - PAN should start with 2221-2720 or 51-55
// validation - Luhn check

function process6(pan: string) {
    const canonicalized = removeWhiteSpace2(pan);

    const validators =
        [
            Result.bind(validateContainsOnlyNumbers),
            Result.bind(validateLength),
            Result.bind(validateMastercard),
            Result.bind(validateLuhn)
        ];

    const validator = composeMany(validators);

    return validator(canonicalized);
}

describe("Process 6", () => {
    it("It works!", () => {
        let pan = "5555 4444 3333 2226";

        let result = process6(pan);

        expect(result).toStrictEqual(okResult("5555444433332226"));
    });
});

// Attempt 7

// canonicalization - remove white space
// validation - PAN can only contain numbers
// validation - PAN should contain 16 digits
// validation - PAN should start with 2221-2720 or 51-55
// validation - Luhn check

function process7(pan: string) {
    const canonicalized = removeWhiteSpace2(pan);

    const validators =
        [validateContainsOnlyNumbers,
            validateLength,
            validateMastercard,
            validateLuhn]
            .map(Result.bind);

    const validator = composeMany(validators);

    return validator(canonicalized);
}

describe("Process 7", () => {
    it("It works!", () => {
        let pan = "5555 4444 3333 2226";

        let result = process7(pan);

        expect(result).toStrictEqual(okResult("5555444433332226"));
    });
});

// Attempt 8

// Infrastructure types

namespace Result {
    type Map =
        <T>(fn: (arg: T) => T) =>
            (arg2: Result<T>) => Result<T>

    export const map: Map =
        (fn) =>
            arg2 => {
                switch (arg2.kind) {
                    case "resultError":
                        return arg2;
                    case "resultOk":
                        return okResult(fn(arg2.value));
                }
            }
}

// canonicalization - remove white space
// validation - PAN can only contain numbers
// validation - PAN should contain 16 digits
// validation - PAN should start with 2221-2720 or 51-55
// validation - Luhn check

function process8(pan: string) {
    const canonicalizer = Result.map(removeWhiteSpace);

    const canonicalized = canonicalizer(okResult(pan));

    const validators =
        [validateContainsOnlyNumbers,
            validateLength,
            validateMastercard,
            validateLuhn]
            .map(Result.bind);

    const validator = composeMany(validators);

    return validator(canonicalized);
}

describe("Process 8", () => {
    it("It works!", () => {
        let pan = "5555 4444 3333 2226";

        let result = process8(pan);

        expect(result).toStrictEqual(okResult("5555444433332226"));
    });
});

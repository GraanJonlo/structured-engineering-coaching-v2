import { describe, expect, it } from "vitest";

import { Result } from "./utility";

import {
    containsOnlyNumbers,
    textStartsWithAnyRange,
    luhnCheck
} from "./pan-helpers";

// import {
//     containsOnlyNumbers,
//     isMastercardLength,
//     textStartsWithMastercardDigits,
//     luhnCheck
// } from "./pan-helpers2";

function validate(unvalidatedPan: string) {
    if (!containsOnlyNumbers(unvalidatedPan)) {
        throw new Error("PAN can only contain numbers");
    }

    if (!(unvalidatedPan.length === 16)) {
        throw new Error("PAN should be 16 digits");
    }

    const mastercardStartWith =
        [{ lower: '2221', upper: '2720' }, { lower: '51', upper: '55' }];

    if (!textStartsWithAnyRange(unvalidatedPan, mastercardStartWith)) {
        throw new Error("PAN is not a Mastercard");
    }

    if (!luhnCheck(unvalidatedPan)) {
        throw new Error("Invalid PAN");
    }

    return unvalidatedPan;
}

describe("Valid PAN", () => {
    it("succeeds", () => {
        let pan = "5555444433332226";

        let result = validate(pan);

        expect(result).toStrictEqual(pan);
    });
});

describe.each([
    { pan: "ABCD444433332226", expected: "PAN can only contain numbers" },
    { pan: "55555444433332226", expected: "PAN should be 16 digits" },
    { pan: "555444433332226", expected: "PAN should be 16 digits" },
    { pan: "2220444433332226", expected: "PAN is not a Mastercard" },
    { pan: "2721444433332226", expected: "PAN is not a Mastercard" },
    { pan: "5055444433332226", expected: "PAN is not a Mastercard" },
    { pan: "5655444433332226", expected: "PAN is not a Mastercard" },
    { pan: "5555444433332220", expected: "Invalid PAN" },
])("Invalid PAN", ({ pan, expected }) => {
    it("throws an error", () => {
        expect(() => validate(pan)).toThrow(expected);
    });
});

// describe("Valid PAN", () => {
//     it("succeeds", () => {
//         let pan = "5555444433332226";

//         let result = validate(pan);

//         expect(result).toStrictEqual(Result.ok(pan));
//     });
// });

// describe.each([
//     { pan: "ABCD444433332226", expected: "PAN can only contain numbers" },
//     { pan: "55555444433332226", expected: "PAN should be 16 digits" },
//     { pan: "555444433332226", expected: "PAN should be 16 digits" },
//     { pan: "2220444433332226", expected: "PAN is not a Mastercard" },
//     { pan: "2721444433332226", expected: "PAN is not a Mastercard" },
//     { pan: "5055444433332226", expected: "PAN is not a Mastercard" },
//     { pan: "5655444433332226", expected: "PAN is not a Mastercard" },
//     { pan: "5555444433332220", expected: "Invalid PAN" },
// ])("Invalid PAN", ({ pan, expected }) => {
//     it("returns error result", () => {
//         let result = validate(pan);

//         expect(result).toStrictEqual(Result.error(expected));
//     });
// });

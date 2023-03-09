import { describe, expect, it } from "vitest";

import { Result } from "./utility";

import {
    removeWhiteSpace,
    containsOnlyNumbers,
    textStartsWithAnyRange,
    luhnCheck
} from "./pan-helpers";

// import {
//     removeWhiteSpace,
//     containsOnlyNumbers,
//     isMastercardLength,
//     textStartsWithMastercardDigits,
//     luhnCheck
// } from "./pan-helpers2";

function validate(unvalidatedPan: string) {
    const canonicalizedPan = removeWhiteSpace(unvalidatedPan);

    if (!containsOnlyNumbers(canonicalizedPan)) {
        throw new Error("PAN can only contain numbers");
    }

    if (!(canonicalizedPan.length === 16)) {
        throw new Error("PAN should be 16 digits");
    }

    const mastercardStartWith =
        [{ lower: '2221', upper: '2720' }, { lower: '51', upper: '55' }];

    if (!textStartsWithAnyRange(canonicalizedPan, mastercardStartWith)) {
        throw new Error("PAN is not a Mastercard");
    }

    if (!luhnCheck(canonicalizedPan)) {
        throw new Error("Invalid PAN");
    }

    return canonicalizedPan;
}

describe("Valid PAN", () => {
    it("succeeds", () => {
        let pan = "5555 4444 3333 2226";

        let result = validate(pan);

        expect(result).toStrictEqual("5555444433332226");
    });
});

describe.each([
    { pan: "ABCD 4444 3333 2226", expected: "PAN can only contain numbers" },
    { pan: "55555 4444 3333 2226", expected: "PAN should be 16 digits" },
    { pan: "555 4444 3333 2226", expected: "PAN should be 16 digits" },
    { pan: "2220 4444 3333 2226", expected: "PAN is not a Mastercard" },
    { pan: "2721 4444 3333 2226", expected: "PAN is not a Mastercard" },
    { pan: "5055 4444 3333 2226", expected: "PAN is not a Mastercard" },
    { pan: "5655 4444 3333 2226", expected: "PAN is not a Mastercard" },
    { pan: "5555 4444 3333 2220", expected: "Invalid PAN" },
])("Invalid PAN", ({ pan, expected }) => {
    it("throws an error", () => {
        expect(() => validate(pan)).toThrow(expected);
    });
});

// function validate(unvalidatedPan: string) {
//     let result = Result.ok(unvalidatedPan);

//     result = removeWhiteSpace(result);

//     result = containsOnlyNumbers(result);

//     result = isMastercardLength(result);

//     result = textStartsWithMastercardDigits(result);

//     result = luhnCheck(result);

//     return result;
// }

// describe("Valid PAN", () => {
//     it("returns ok result", () => {
//         let pan = "5555 4444 3333 2226";

//         let result = validate(pan);

//         expect(result).toStrictEqual(Result.ok("5555444433332226"));
//     });
// });

// describe.each([
//     { pan: "ABCD 4444 3333 2226", expected: "PAN can only contain numbers" },
//     { pan: "55555 4444 3333 2226", expected: "PAN should be 16 digits" },
//     { pan: "555 4444 3333 2226", expected: "PAN should be 16 digits" },
//     { pan: "2220 4444 3333 2226", expected: "PAN is not a Mastercard" },
//     { pan: "2721 4444 3333 2226", expected: "PAN is not a Mastercard" },
//     { pan: "5055 4444 3333 2226", expected: "PAN is not a Mastercard" },
//     { pan: "5655 4444 3333 2226", expected: "PAN is not a Mastercard" },
//     { pan: "5555 4444 3333 2220", expected: "Invalid PAN" },
// ])("Invalid PAN", ({ pan, expected }) => {
//     it("returns error result", () => {
//         let result = validate(pan);

//         expect(result).toStrictEqual(Result.error(expected));
//     });
// });

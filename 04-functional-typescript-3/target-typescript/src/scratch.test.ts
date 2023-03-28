import { describe, expect, it } from "vitest";

import { Result } from "./utility";

import { panValidator } from "./validation";

type Validate = (unvalidatedPan: string) => Result<string>;

const validate: Validate = panValidator

describe("Valid PAN", () => {
    it("returns ok result", () => {
        let pan = "5555444433332226";

        let result = validate(pan);

        expect(result).toStrictEqual(Result.ok(pan));
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
    it("returns error result", () => {
        let result = validate(pan);

        expect(result).toStrictEqual(Result.error(expected));
    });
});

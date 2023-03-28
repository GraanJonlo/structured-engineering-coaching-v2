import { describe, expect, it } from "vitest";

import {
    containsOnlyNumbers,
    isMastercardLength,
    textStartsWithMastercardDigits,
    luhnCheck,
    panValidator
} from "./validation";

import { Result } from "./utility";

describe("utility functions", () => {
    it("should be ok when valid PAN", () => {
        const result = panValidator("5555444433332226");

        expect(result).toStrictEqual(Result.ok("5555444433332226"));
    });

    it("should be error when contains non-numeric", () => {
        const result = containsOnlyNumbers("555544443333222a");

        expect(result).toStrictEqual(Result.error("PAN can only contain numbers"));
    });

    it("should be error when incorrect length", () => {
        const result = isMastercardLength("555544443333222");

        expect(result).toStrictEqual(Result.error("PAN should be 16 digits"));
    });

    it("should be error when outside all of the ranges", () => {
        const result = textStartsWithMastercardDigits("4444333322221111");

        expect(result).toStrictEqual(Result.error("PAN is not a Mastercard"));
    });

    it("should fail Luhn check", () => {
        const result = luhnCheck("5555444433332222");

        expect(result).toStrictEqual(Result.error("Invalid PAN"));
    });
});

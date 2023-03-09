import { describe, expect, it } from "vitest";

import {
    containsOnlyNumbers,
    isMastercardLength,
    textStartsWithMastercardDigits,
    luhnCheck
} from "./pan-helpers2";

import { Result } from "./utility";

describe("utility functions", () => {
    it("should be ok when only numbers", () => {
        const result = containsOnlyNumbers("1234567890");

        expect(result).toStrictEqual(Result.ok("1234567890"));
    });

    it("should be error when contains non-numeric", () => {
        const result = containsOnlyNumbers("1234567890a");

        expect(result).toStrictEqual(Result.error("PAN can only contain numbers"));
    });

    it("should be ok when correct length", () => {
        const result = isMastercardLength("1234567890123456");

        expect(result).toStrictEqual(Result.ok("1234567890123456"));
    });

    it("should be error when incorrect length", () => {
        const result = isMastercardLength("123456789012345");

        expect(result).toStrictEqual(Result.error("PAN should be 16 digits"));
    });

    it("should be ok when inside one of the ranges", () => {
        const result = textStartsWithMastercardDigits("5112345");

        expect(result).toStrictEqual(Result.ok("5112345"));
    });

    it("should be error when outside all of the ranges", () => {
        const result = textStartsWithMastercardDigits("5012345");

        expect(result).toStrictEqual(Result.error("PAN is not a Mastercard"));
    });

    it("should pass Luhn check", () => {
        const result = luhnCheck("9142");

        expect(result).toStrictEqual(Result.ok("9142"));
    });

    it("should fail Luhn check", () => {
        const result = luhnCheck("9141");

        expect(result).toStrictEqual(Result.error("Invalid PAN"));
    });
});

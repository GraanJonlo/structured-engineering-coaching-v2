import { describe, expect, it } from "vitest";

import { containsOnlyNumbers, textStartsWithAnyRange, luhnCheck } from "./pan-helpers";

describe("utility functions", () => {
    it("should be true when only numbers", () => {
        const result = containsOnlyNumbers("1234567890");

        expect(result).eq(true);
    });

    it("should be false when contains non-numeric", () => {
        const result = containsOnlyNumbers("1234567890a");

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

    it("should pass Luhn check", () => {
        const result = luhnCheck("9142");

        expect(result).eq(true);
    });

    it("should fail Luhn check", () => {
        const result = luhnCheck("9141");

        expect(result).eq(false);
    });
});

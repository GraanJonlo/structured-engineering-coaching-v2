import { describe, expect, it } from "vitest";

describe("sanity", () => {
    it("true is true", () => {
        expect(true).eq(true);
    });
});

const aNumber = 5;

const square = (x: number) => x * x;
const cube = (x: number) => x * x * x;
const add = (x: number, y: number) => x + y;

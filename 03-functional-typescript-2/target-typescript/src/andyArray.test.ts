import { describe, expect, it } from "vitest";

import { AndyArray } from "./utility";

const square = (x: number) => x * x;
const cube = (x: number) => x * x * x;
const add = (x: number, y: number) => x + y;

describe("AndyArray", () => {
    it("map/ lift", () => {
        const liftedFunction = AndyArray.map(square);

        const result = liftedFunction([2, 3]);

        expect(result).toStrictEqual([4, 9]);
    });

    it("lift2", () => {
        const liftedFunction = AndyArray.lift2(add);

        const result = liftedFunction([1, 2, 3], [4, 5, 6]);

        expect(result).toStrictEqual([5, 7, 9]);
    });

    it("apply", () => {
        const liftedFunction = AndyArray.apply([square, cube]);

        const result = liftedFunction([2, 5]);

        expect(result).toStrictEqual([4, 25, 8, 125]);
    });
});
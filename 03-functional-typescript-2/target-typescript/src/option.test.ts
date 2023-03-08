import { describe, expect, it } from "vitest";

import { Option } from "./utility";

const square = (x: number) => x * x;
const add = (x: number, y: number) => x + y;

describe.each([
    [Option.none(), Option.none()],
    [Option.some(2), Option.some(4)]
])("map/ lift", (arg: Option<number>, expected: Option<number>) => {
    it("does the thing", () => {
        const liftedFunction = Option.map(square);

        const result = liftedFunction(arg);

        expect(result).toStrictEqual(expected);
    });
});

describe.each([
    [Option.none(), Option.none(), Option.none()],
    [Option.some(1), Option.none(), Option.none()],
    [Option.none(), Option.some(2), Option.none()],
    [Option.some(1), Option.some(2), Option.some(3)]
])("lift2", (arg1: Option<number>, arg2: Option<number>, expected: Option<number>) => {
    it("does the thing", () => {
        const liftedFunction = Option.lift2(add);

        const result = liftedFunction(arg1, arg2);

        expect(result).toStrictEqual(expected);
    });
});

describe.each([
    [Option.none(), Option.none(), Option.none()],
    [Option.none(), Option.some(3), Option.none()],
    [Option.some(square), Option.none(), Option.none()],
    [Option.some(square), Option.some(3), Option.some(9)]
])("apply", (fn: Option<(n:number) => number>, arg: Option<number>, expected) => {
    it("does the thing", () => {
        const liftedFunction = Option.apply(fn);

        const result = liftedFunction(arg);

        expect(result).toStrictEqual(expected);
    });
});
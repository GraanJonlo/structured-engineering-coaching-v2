import { describe, expect, it } from "vitest";

import { Result } from "./utility";

const square = (x: number) => x * x;
const format = (x: number, y: string) => `${x}-${y}`

describe.each([
    [Result.error('Some error'), Result.error('Some error')],
    [Result.ok(2), Result.ok(4)]
])("map/ lift", (arg: Result<number>, expected: Result<number>) => {
    it("does the thing", () => {
        const liftedFunction = Result.map(square);

        const result = liftedFunction(arg);

        expect(result).toStrictEqual(expected);
    });
});

describe.each([
    [Result.error('e1'), Result.error('e2'), Result.error('e1')],
    [Result.error('e1'), Result.ok("2"), Result.error('e1')],
    [Result.ok(1), Result.error('e2'), Result.error('e2')],
    [Result.ok(1), Result.ok("2"), Result.ok("1-2")]
])("lift2", (x: Result<number>, y: Result<string>, expected: Result<string>) => {
    it("does the thing", () => {
        const liftedFunction = Result.lift2(format);

        const result = liftedFunction(x, y);

        expect(result).toStrictEqual(expected);
    });
});

describe.each([
    [Result.error('e1'), Result.error('e2'), Result.error('e1')],
    [Result.error('e1'), Result.ok(2), Result.error('e1')],
    [Result.ok(square), Result.error('e2'), Result.error('e2')],
    [Result.ok(square), Result.ok(2), Result.ok(4)]
])("apply", (fn: Result<(n: number) => number>, arg: Result<number>, expected) => {
    it("does the thing", () => {
        const liftedFunction = Result.apply(fn);

        const result = liftedFunction(arg);

        expect(result).toStrictEqual(expected);
    });
});

describe('error', () => {
    it('needs a type annotation', () => {
        const liftedFunction1 = Result.apply(Result.error<(n: number) => number>('e1'));
        const liftedFunction2 = Result.lift(square);

        const result1 = liftedFunction1(Result.ok(2));

        expect(result1).toStrictEqual(Result.error('e1'));

        const result2 = liftedFunction2(result1);

        expect(result2).toStrictEqual(Result.error('e1'));
    });
});

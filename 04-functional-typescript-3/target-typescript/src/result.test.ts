import { describe, expect, it } from "vitest";

import { Result } from "./utility";

const square = (x: number) => x * x;
const format = (x: number, y: string) => `${x}-${y}`

const mustBeEven: (x: number) => Result<string> =
    (x) => {
        if (x % 2 === 0) {
            return Result.ok('even');
        } else {
            return Result.error('odd');
        }
    };

describe.each([
    [Result.error('Some error'), Result.error('Some error')],
    [Result.ok(2), Result.ok(4)]
])("map/ lift", (arg: Result<number>, expected: Result<number>) => {
    it("lifts function", () => {
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
    it("lifts function", () => {
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
    it("lifts function", () => {
        const liftedFunction = Result.apply(fn);

        const result = liftedFunction(arg);

        expect(result).toStrictEqual(expected);
    });
});

describe('error', () => {
    it('needs a type annotation', () => {
        const liftedFunction1 =
            Result.apply(Result.error<(n: number) => number>('e1'));

        const liftedFunction2 = Result.lift(square);

        const result1 = liftedFunction1(Result.ok(2));

        expect(result1).toStrictEqual(Result.error('e1'));

        const result2 = liftedFunction2(result1);

        expect(result2).toStrictEqual(Result.error('e1'));
    });
});

describe.each([2, 4, 6])("bind", (evenNumber: number) => {
    it("binds ok", () => {
        const liftedFunction = Result.bind(mustBeEven);

        const result = liftedFunction(Result.ok(evenNumber));

        expect(result).toStrictEqual(Result.ok('even'));
    });
});

describe.each([1, 3, 5])("bind", (oddNumber: number) => {
    it("binds error", () => {
        const liftedFunction = Result.bind(mustBeEven);

        const result = liftedFunction(Result.ok(oddNumber));

        expect(result).toStrictEqual(Result.error('odd'));
    });
});

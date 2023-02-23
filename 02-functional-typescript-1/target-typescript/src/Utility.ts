type Compose =
    <T1, T2, U>(fn1: (arg: T1) => T2, fn2: (arg: T2) => U) =>
        (arg: T1) =>
            U;

export const compose: Compose =
    (fn1, fn2) =>
        value =>
            fn2(fn1(value));

type Partial =
    <T1, T2 extends unknown[], U>(fn: (arg: T1, ...remaining: T2) => U, toApply: T1) =>
        (...remaining: T2) =>
            U;

export const partial: Partial =
    (fn, toApply) => {
        return (...remainingArgs) => fn(toApply, ...remainingArgs)
    }

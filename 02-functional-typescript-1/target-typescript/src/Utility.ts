type Compose =
    <T1, T2, U>(fn1: (arg: T1) => T2, fn2: (arg: T2) => U) =>
        (arg: T1) =>
            U;

export const compose: Compose =
    (fn1, fn2) =>
        value =>
            fn2(fn1(value));
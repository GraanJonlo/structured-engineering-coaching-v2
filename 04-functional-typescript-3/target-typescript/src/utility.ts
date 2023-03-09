type Compose =
    <T1, T2, U>(fn1: (arg: T1) => T2, fn2: (arg: T2) => U) =>
        (arg: T1) =>
            U;

type ComposeMany =
    <T>(fns: ((arg: T) => T)[]) =>
        (arg: T) =>
            T;

type Partial =
    <T1, T2 extends unknown[], U>(fn: (arg: T1, ...remaining: T2) => U, toApply: T1) =>
        (...remaining: T2) =>
            U;

export const compose: Compose =
    (fn1, fn2) =>
        value =>
            fn2(fn1(value));

export const composeMany: ComposeMany =
    (fns) =>
        fns.reduce((agg, cur, _currentIndex, _array) => compose(agg, cur));

export const partial: Partial =
    (fn, toApply) => {
        return (...remainingArgs) => fn(toApply, ...remainingArgs)
    }

export type Option<T> =
    | { readonly tag: 'some'; readonly value: T }
    | { readonly tag: 'none' };

export namespace Option {
    type Lift =
        <T, U>(fn: (arg: T) => U) =>
            (arg: Option<T>) =>
                Option<U>;

    type Map = Lift;

    type Lift2 =
        <T1, T2, U>(fn: (arg1: T1, arg2: T2) => U) =>
            (arg1: Option<T1>, arg2: Option<T2>) =>
                Option<U>;

    type Apply =
        <T, U>(fn: Option<((arg: T) => U)>) =>
            (arr: Option<T>) => Option<U>;

    export function some<T>(value: T): Option<T> {
        return { tag: 'some', value: value };
    }

    export function none<T>(): Option<T> {
        return { tag: 'none' };
    }

    export const lift: Lift =
        (fn) => {
            return (arg) => {
                switch (arg.tag) {
                    case 'none':
                        return none();
                    case 'some':
                        return some(fn(arg.value));
                }
            };
        };

    export const map: Map = lift;

    export const lift2: Lift2 =
        (fn) => {
            return (arg1, arg2) => {
                if (arg1.tag === 'none' || arg2.tag === 'none') {
                    return none();
                } else {
                    return some(fn(arg1.value, arg2.value));
                }
            };
        };

    export const apply: Apply =
        (fn) => {
            return (arg) => {
                if (fn.tag === 'none' || arg.tag === 'none') {
                    return none();
                } else {
                    return Option.some(fn.value(arg.value));
                }
            };
        };
};

export type Result<T> =
    | { readonly tag: 'ok', readonly value: T }
    | { readonly tag: 'error', readonly message: string };

export namespace Result {
    type Lift =
        <T, U>(fn: (arg: T) => U) =>
            (arg: Result<T>) =>
                Result<U>;

    type Lift2 =
        <T1, T2, U>(fn: (arg1: T1, arg2: T2) => U) =>
            (arg1: Result<T1>, arg2: Result<T2>) =>
                Result<U>;

    type Map = Lift;

    type Apply =
        <T, U>(fn: Result<((arg: T) => U)>) =>
            (arr: Result<T>) =>
                Result<U>;

    type Bind =
        <T, U>(fn: (arg: T) => Result<U>) =>
            (arg: Result<T>) =>
                Result<U>

    export function ok<T>(value: T): Result<T> {
        return { tag: 'ok', value: value };
    }

    export function error<T>(message: string): Result<T> {
        return { tag: 'error', message: message };
    }

    export const lift: Lift =
        (fn) => {
            return (arg) => {
                switch (arg.tag) {
                    case 'error':
                        return arg;
                    case 'ok':
                        return ok(fn(arg.value));
                }
            };
        };

    export const map: Map = lift;

    export const lift2: Lift2 =
        <T1, T2, U>(fn: (a: T1, b: T2) => U) => {
            return (arg1: Result<T1>, arg2: Result<T2>) => {
                if (arg1.tag === 'error') {
                    return arg1;
                } else if (arg2.tag === 'error') {
                    return arg2;
                } else {
                    return Result.ok(fn(arg1.value, arg2.value));
                }
            };
        };

    export const apply: Apply =
        (fn) => {
            return (arg) => {
                if (fn.tag === 'error') {
                    return fn;
                } else if (arg.tag === 'error') {
                    return arg
                } else {
                    return Result.ok(fn.value(arg.value));
                }
            };
        };

    export const bind: Bind =
        (fn) => {
            return (arg) => {
                switch (arg.tag) {
                    case 'error':
                        return arg;
                    case 'ok':
                        return fn(arg.value);
                }
            };
        };
};

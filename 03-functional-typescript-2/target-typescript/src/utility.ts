export namespace AndyArray {
    // Map is sometimes called lift
    type Lift =
        <T, U>(fn: (arg: T) => U) =>
            (arr: T[]) =>
                U[];

    // Lift is sometimes called Map
    type Map = Lift;

    // LiftN can be used to lift functions with multiple arguments
    type Lift2 =
        <T1, T2, U>(fn: (arg1: T1, arg2: T2) => U) =>
            (arr1: T1[], arr2: T2[]) =>
                U[];

    type Lift3 =
        <T1, T2, T3, U>(fn: (arg1: T1, arg2: T2, arg3: T3) => U) =>
            (arr1: T1[], arr2: T2[], arr3: T3[]) =>
                U[];

    // Apply for when the function is also elevated E.G. An array of functions
    type Apply =
        <T, U>(fns: ((arg: T) => U)[]) =>
            (arr: T[]) =>
                U[];

    export const lift: Lift =
        (fn) => {
            return (arr) => {
                let result = [];

                arr.forEach(element => {
                    result.push(fn(element));
                });

                return result;
            };
        };

    export const map: Map = lift;

    export const lift2: Lift2 =
        (fn) => {
            return (arr1, arr2) => {
                let result = [];

                let length = Math.min(arr1.length, arr2.length);
                for (let i = 0; i < length; i++) {
                    result.push(fn(arr1[i], arr2[i]));
                }

                return result;
            };
        };

    export const lift3: Lift3 =
        (fn) => {
            return (arr1, arr2, arr3) => {
                let result = [];

                let length = Math.min(arr1.length, arr2.length, arr3.length);
                for (let i = 0; i < length; i++) {
                    result.push(fn(arr1[i], arr2[i], arr3[i]));
                }

                return result;
            };
        };

    export const apply: Apply =
        <U>(fns) => {
            return (arr) => {
                let result: U[] = [];

                fns.forEach(fn => {
                    arr.forEach(element => {
                        result.push(fn(element));
                    });
                });

                return result;
            }
        };
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
                switch (arg1.tag) {
                    case 'none':
                        return none();
                    case 'some':
                        switch (arg2.tag) {
                            case 'none':
                                return none();
                            case 'some':
                                return some(fn(arg1.value, arg2.value));
                        }
                }
            };
        };

    export const apply: Apply =
        (fn) => {
            return (arg) => {
                switch (fn.tag) {
                    case 'none':
                        return none();
                    case 'some':
                        switch (arg.tag) {
                            case 'none':
                                return none();
                            case 'some':
                                return Option.some(fn.value(arg.value));
                        }
                }
            };
        };
}

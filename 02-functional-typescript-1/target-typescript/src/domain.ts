import { compose } from "./utility";

export namespace Account {
    type Current = { readonly kind: 'current', readonly value: number };
    type Savings = { readonly kind: 'savings', readonly value: number };
    type Account = Current | Savings;

    type CalculateInterest = (account: Account) => number;
    type TellMeMyInterest = (account: Account) => string;

    export function createCurrent(value: number): Account {
        return { kind: 'current', value: value };
    }

    export function createSavings(value: number): Account {
        return { kind: 'savings', value: value };
    }

    export const calculateInterest: CalculateInterest =
        (account: Account) => {
            switch (account.kind) {
                case "current":
                    return account.value * 0.02;
                case "savings":
                    return account.value * 0.05;
            }
        };

    function formatInterest(value: number) {
        return `You've earned ${value} pence interest`
    }

    export const tellMeMyInterest: TellMeMyInterest =
        compose(calculateInterest, formatInterest);
}

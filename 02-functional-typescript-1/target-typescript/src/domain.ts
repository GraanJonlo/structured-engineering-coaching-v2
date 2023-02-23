import { compose } from "./utility";

export namespace Account {
    type Current = { readonly kind: 'current', readonly balance: number };
    type Savings = { readonly kind: 'savings', readonly balance: number };
    type Account = Current | Savings;

    type CalculateInterest = (account: Account) => number;
    type TellMeMyInterest = (account: Account) => string;

    export function createCurrent(balance: number): Account {
        return { kind: 'current', balance: balance };
    }

    export function createSavings(balance: number): Account {
        return { kind: 'savings', balance: balance };
    }

    export const calculateInterest: CalculateInterest =
        (account: Account) => {
            switch (account.kind) {
                case "current":
                    return account.balance * 0.02;
                case "savings":
                    return account.balance * 0.05;
            }
        };

    function formatInterest(pence: number) {
        return `You've earned ${pence} pence interest`
    }

    export const tellMeMyInterest: TellMeMyInterest =
        compose(calculateInterest, formatInterest);
}

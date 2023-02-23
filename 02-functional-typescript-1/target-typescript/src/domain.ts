import { compose } from "./utility";

export namespace Account {
    type Account =
        | { readonly tag: 'current', readonly balance: number }
        | { readonly tag: 'savings', readonly balance: number };

    type CalculateInterest = (account: Account) => number;
    type TellMeMyInterest = (account: Account) => string;

    export function createCurrent(balance: number): Account {
        return { tag: 'current', balance: balance };
    }

    export function createSavings(balance: number): Account {
        return { tag: 'savings', balance: balance };
    }

    export const calculateInterest: CalculateInterest =
        (account: Account) => {
            switch (account.tag) {
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

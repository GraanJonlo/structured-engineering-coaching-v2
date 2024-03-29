import { compose } from "./utility";

export namespace Account {
    type Account =
        | { readonly tag: 'current', readonly balance: number, readonly overdraft: number }
        | { readonly tag: 'savings', readonly balance: number };

    type CalculateInterest = (account: Account) => number;
    type TellMeMyInterest = (account: Account) => string;

    export function current(balance: number, overdraft: number): Account {
        return { tag: 'current', balance: balance, overdraft: overdraft };
    }

    export function savings(balance: number): Account {
        return { tag: 'savings', balance: balance };
    }

    export const calculateInterest: CalculateInterest =
        (account) => {
            switch (account.tag) {
                case "current":
                    if (account.balance < 0) {
                        return 0;
                    } else {
                        return account.balance * 0.02;
                    }
                case "savings":
                    return account.balance * 0.05;
            }
        };

    function formatInterest(pence: number) {
        return `You've earned ${pence} pence interest`;
    }

    export const tellMeMyInterest: TellMeMyInterest =
        compose(calculateInterest, formatInterest);
}

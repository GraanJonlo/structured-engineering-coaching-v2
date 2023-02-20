import { describe, expect, it } from "vitest";

function calculateInterest(account) {
    if (account.kind === 'savings') {
        return account.value * 0.05;
    } else if (account.kind === 'current') {
        return account.value * 0.02;
    }
}

function formatInterest(value: number) {
    return `You've earned ${value} pence interest`
}

function tellMeMyInterest(account) {
    const interest = calculateInterest(account);
    return formatInterest(interest);
}

describe("Account tests", () => {
    it("Calculates savings interest", () => {
        const myAccount =
        {
            kind: "savings",
            value: 500
        };

        const result = calculateInterest(myAccount);

        const expected = 25;
        expect(result).eq(expected);
    });
});

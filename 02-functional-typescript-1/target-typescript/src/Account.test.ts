import { describe, expect, it } from "vitest";

import { Account } from "./Domain";

describe("Account tests", () => {
    it("Calculates savings interest", () => {
        const myAccount = Account.createSavings(500);

        const result = Account.calculateInterest(myAccount);
        const expected = 25;

        expect(result).eq(expected);
    });

    it("Formats savings interest correctly", () => {
        const myAccount = Account.createSavings(500);

        const result = Account.tellMeMyInterest(myAccount);
        const expected = "You've earned 25 pence interest";

        expect(result).eq(expected);
    });
});

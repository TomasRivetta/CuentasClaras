// Pure business logic – no React, fully testable

export interface Participant {
  id: number;
  name: string;
  desc: string;
  amount: number;
}

export interface Transfer {
  from: string;
  to: string;
  amount: number;
  settled: boolean;
}

export interface Balance {
  name: string;
  balance: number;
}

/** Greedy minimal-transfer algorithm */
export function computeTransfers(balances: Balance[]): Transfer[] {
  const eps = 0.01;
  const credits = balances
    .filter((b) => b.balance > eps)
    .map((b) => ({ ...b }))
    .sort((a, b) => b.balance - a.balance);
  const debts = balances
    .filter((b) => -b.balance > eps)
    .map((b) => ({ ...b }))
    .sort((a, b) => a.balance - b.balance);

  const result: Transfer[] = [];
  let i = 0,
    j = 0;
  while (i < credits.length && j < debts.length) {
    const credit = credits[i];
    const debt = debts[j];
    const amount = Math.min(credit.balance, -debt.balance);
    if (amount > eps) {
      result.push({ from: debt.name, to: credit.name, amount, settled: false });
    }
    credit.balance += debt.balance;
    debt.balance += amount;
    if (Math.abs(credit.balance) < eps) i++;
    if (Math.abs(debt.balance) < eps) j++;
  }
  return result;
}

export function formatMoney(n: number): string {
  return (
    "$ " +
    n.toLocaleString("es-AR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })
  );
}

export const AVATAR_COLORS = [
  { bg: "#d1fae5", color: "#006d4a" },
  { bg: "#fde8ea", color: "#bd0c3b" },
  { bg: "#e0eaf3", color: "#506076" },
  { bg: "#fef9c3", color: "#b45309" },
  { bg: "#e0e7ff", color: "#4338ca" },
  { bg: "#fce7f3", color: "#9d174d" },
];

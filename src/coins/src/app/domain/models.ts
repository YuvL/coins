export type AccountId = number;
export type Currency = 'RUB' | 'USD';

export interface Transaction {
	fromAccount: AccountId;
	toAccount: AccountId;
	amount: Money;
}

export interface Money {
	amount: number;
	currency: Currency;
}

export interface Account {
	id: AccountId;
	title: string;
	isIncome: boolean;
	balance: Money;
}

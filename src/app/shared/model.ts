/**
 * The user account
 */
export interface UserAccount {
    description: string;
    balance: number;
}

/**
 * The transfer data
 */
export interface Transfer {
    to: string;
    amount: number;
}

/** The transaction interface that represents the object in transactions.json */
export interface Transaction {
    categoryCode?: string;
    dates: { valueDate: number | string };
    transaction: {
        amountCurrency: {
            amount: number;
            currencyCode: 'EUR' | 'BRL' | 'USD';
        },
        type: string;
        creditDebitIndicator: 'CRDT' | 'DBIT';
    };
    merchant: {
        name: string;
        accountNumber: string;
    };
}

/** The filter order accepted values */
export type FilterOrder = 'ASC' | 'DESC';

/** The filter types */
export const sortFiltersTypes = ['DATE', 'BENEFICIARY', 'AMOUNT'] as const;
export type SortFilter = typeof sortFiltersTypes[number];

/** The colors of the grid */
export type Color = { [key: string]: string };

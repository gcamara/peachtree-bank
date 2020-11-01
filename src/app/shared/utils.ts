export const Utils = {
  /**
   * Formats the amount to have only two digits.
   */
    formatAmount: (amount: number): string => {
        return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 })
      .format(amount ?? 0);
    }
};

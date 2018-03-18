const rentChecker = rentStrings => {
  const isRent = (transaction) => {
    return rentStrings.some((string) => transaction.description.includes(string));
  };
  return isRent
};
module.exports = rentChecker;

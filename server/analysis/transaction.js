const moment = require('moment').utc;
const accounting = require('accounting');

const getNewId = (i => () => i++)(0);

const parseSterlingToPennies = (sterling) => parseInt(Math.round(accounting.unformat(sterling)*100));

const transactionObj = (transaction, modifiers) => {
  const id = getNewId();
  const methods = {
    id: id,
    transaction: transaction,
    date: moment(modifiers.date || transaction.Date, 'DD-MM-YYYY').toDate(),
    amount: parseSterlingToPennies(transaction.Value),
    balance: parseSterlingToPennies(transaction.Balance),
    description: transaction.Description,
    toString: ({ id, transaction }),
    /* addModifier: newTransactionObj(transaction, Object.assign({}, modifiers, newModifiers)),*/
  }
  return methods;
}

module.exports = transactionObj;

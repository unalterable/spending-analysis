const _ = require('lodash');
const accounting = require('accounting');
const moment = require('moment').utc;

const getNewId = (i => () => i++)(0);

const parseSterlingToPennies = (sterling) => parseInt(Math.round(accounting.unformat(sterling)*100));


const newTransactionObj = (transaction, modifiers) => {
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

const collectTransactions = transactions => {
  return [].concat(
    transactions.spending || [],
    transactions.rent || [],
    transactions.income || [],
  )
};

const calcStartingBalance = totalsByDate => {
  const firstTransaction = _.minBy(collectTransactions(totalsByDate[0].transactions), t => t.id);
  return firstTransaction.balance - firstTransaction.amount;
};

const minDate = transactions => _.minBy(transactions, t => t.date).date;
const maxDate = transactions => _.maxBy(transactions, t => t.date).date;

const createOrderedDateRange = (firstDay, lastDay) => {
  const start = moment(firstDay)
  const finish = moment(lastDay)
  const range = [];
  for(let day = start; day <= finish; day = day.add(1, 'days')){
    range.push(day.toDate());
  }
  return range;
}

const isRent = (transaction) => {
  return transaction.description.includes('rent')
}

const category = (transaction) => {
  if (isRent(transaction))
    return 'rent';
  if (transaction.amount > 0)
    return 'income';
  return 'spending';
};

const keyByDateAndCategory = (transactions) => {
  return transactions.reduce((memo, t) =>
    _.update(memo, [t.date, category(t)], val => (val || []).concat(t)),
    {}
  )
};

const total = (transactions) => {
  return (transactions || []).reduce((sum, t) => sum + t.amount, 0)
};

const getMonth = (date) => moment(date).format('MM-YYYY');

const calcTotalsByDate = (transactions) => {
  const transactionsByDateAndCategory = keyByDateAndCategory(transactions);
  const dateRange = createOrderedDateRange(minDate(transactions), maxDate(transactions));
  return dateRange.map(date => {
    const transactionsOnThisDate = transactionsByDateAndCategory[date] || {};
    const spending = total(transactionsOnThisDate.spending);
    const rent = total(transactionsOnThisDate.rent);
    const income = total(transactionsOnThisDate.income);
    return {
      date, spending, rent, income, transactions: transactionsOnThisDate,
    };
  });
};

const calcMonthlyTotals = (totalsByDate) => {
  const monthlyTotals = {};
  totalsByDate.forEach(dayTotals => {
    const month = getMonth(dayTotals.date);
    if(!monthlyTotals[month])
      monthlyTotals[month] = {spending: 0, rent: 0, income: 0 }
    monthlyTotals[month].spending += dayTotals.spending;
    monthlyTotals[month].rent += dayTotals.rent;
    monthlyTotals[month].income += dayTotals.income;
  })
  return monthlyTotals;
};

const addBalances = (totalsByDate, monthlyTotals) => {
  let spendingSoFarThisMonth = 0;
  let balance = calcStartingBalance(totalsByDate);
  let amortisedBalance = balance;
  return totalsByDate.map(dayTotals => {
    const dayOfMonth = moment(dayTotals.date).date();
    const totalMonthlyRentAndIncome = monthlyTotals[getMonth(dayTotals.date)].rent + monthlyTotals[getMonth(dayTotals.date)].income;
    spendingSoFarThisMonth = (dayOfMonth !== 1 ? spendingSoFarThisMonth : 0) + dayTotals.spending;
    balance += (dayTotals.spending + dayTotals.income + dayTotals.rent)
    amortisedBalance += (dayTotals.spending + totalMonthlyRentAndIncome/(moment(dayTotals.date).daysInMonth()))
    return Object.assign({}, dayTotals, { spendingSoFarThisMonth, balance, amortisedBalance })
  })
};

const checkBalances = (balances) => {
  return balances.every((day, i) => {
    const allTransactions = collectTransactions(day.transactions);
    if(allTransactions.length > 0){
      const possibleBalances = allTransactions.map(t => t.balance);
      if(!possibleBalances.includes(day.balance)){
        throw new Error(`Balance incorrect for transaction ${i}, it is ${day.balance} and is should be one of ${possibleBalances}`)
      }
    }
  });
};

const createAnalysis = (statement) => {
  const transactions = statement.map(newTransactionObj)
  const totalsByDate = calcTotalsByDate(transactions);
  const monthlyTotals = calcMonthlyTotals(totalsByDate);
  const balances = addBalances(totalsByDate, monthlyTotals);
  checkBalances(balances);
  return balances;
};

module.exports = createAnalysis;


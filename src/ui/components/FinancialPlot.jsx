import React from 'react';

const formatCurrency = num => num/100;

const defaultApplication = [{
  type: 'scatter',
  mode: 'lines+points',
  x: [],
  y: [],
  marker: {color: 'red'},
}];

const populateApplication = (data) => {
  if (!data) {
    return defaultApplication;
  }
  const xAxis = data.map(datum => datum.date);
  return [
    {
      name: 'Balance',
      x: xAxis,
      y: data.map(datum => formatCurrency(datum.balance)),
      mode: 'lines',
    },
    {
      name: 'Spending So Far This Month',
      x: xAxis,
      y: data.map(datum => formatCurrency(datum.spendingSoFarThisMonth)),
      mode: 'lines',
    },
    {
      name: 'Amortised Balance',
      x: xAxis,
      y: data.map(datum => formatCurrency(datum.amortisedBalance)),
      mode: 'lines',
    },
  ];
};

const FinancialPlot = ({data}) => {
  const layout = {
    title: 'A Fancy Plot',
    width: 1200,
  };
  return null;
  /* (
   *   <Plot
   *     data={populateApplication(data)}
   *     layout={layout}
   *     onClick={console.log /*eslint-disable-line no-console*/
};

export default FinancialPlot;


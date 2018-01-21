import React from 'react';
import Plot from 'react-plotly.js'

const formatCurrency = num => num/100;

const defaultApplication = [{
  type: 'scatter',
  mode: 'lines+points',
  x: [],
  y: [],
  marker: {color: 'red'}
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
  ]
};

const FinancialPlot = ({data}) => {
  const layout = {
    title: 'A Fancy Plot'
  };
  return (
    <Plot
      data={populateApplication(data)}
      layout={layout}
      onClick={console.log}
    />
  );
};

export default FinancialPlot;


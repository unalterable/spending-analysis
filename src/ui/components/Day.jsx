import React from 'react';
import TransactionSection from './TransactionSection.jsx';
import { formatDate, formatCurrency } from '../utils/format.js';

class Day extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      expanded: false,
    };
  }
  toggleExpand(){
    this.setState({
      expanded: !this.state.expanded,
    });
  }
  render(){
    const row = this.props;
    return (
      <tbody onClick={this.toggleExpand.bind(this)}>
        <tr>
          <td>{formatDate(row.date)}</td>
          <td style={row.spending < -50000 ? {color: '#F00'} : {}} align='right'>{formatCurrency(row.spending)}</td>
          <td align='right'>{formatCurrency(row.income)}</td>
          <td align='right'>{formatCurrency(row.rent)}</td>
          <td align='right'>{formatCurrency(row.balance)}</td>
          <td align='right'>{formatCurrency(row.amortisedBalance)}</td>
          <td align='right'>{formatCurrency(row.spendingSoFarThisMonth)}</td>
        </tr>
        { this.state.expanded && (
          <tr>
            <td colSpan={7} align='center'>
              <TransactionSection {...row.transactions} />
            </td>
          </tr>
        ) }
      </tbody>
    );
  }
}

export default Day;

import React from 'react';

import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import withStyles from '@material-ui/core/styles/withStyles';

import TransactionSection from './TransactionSection.jsx';
import { formatDate, formatCurrency } from '../utils/format.js';

const styles = theme => ({
  dayRow: {
    backgroundColor: '#eee',
  },
  dateCell: {
    width: '20%',
  },
});

class Day extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      expanded: false,
    };
  }
  toggleExpand(){
    this.setState({ expanded: !this.state.expanded });
  }
  render(){
    const { classes, day } = this.props;
    return (
      <TableBody>
        <TableRow className={classes.dayRow} onClick={this.toggleExpand.bind(this)}>
          <TableCell  style={{ width: '20%' }}>{formatDate(day.date)}</TableCell>
          <TableCell style={day.spending < -50000 ? {color: '#F00'} : {}} align="right">{formatCurrency(day.spending)}</TableCell>
          <TableCell align="right">{formatCurrency(day.income)}</TableCell>
          <TableCell align="right">{formatCurrency(day.rent)}</TableCell>
          <TableCell align="right">{formatCurrency(day.balance)}</TableCell>
          <TableCell align="right">{formatCurrency(day.amortisedBalance)}</TableCell>
          <TableCell align="right">{formatCurrency(day.spendingSoFarThisMonth)}</TableCell>
        </TableRow>
        { this.state.expanded && (
            <TableRow className={classes.transactions}>
              <TableCell colSpan={7} align="center">
                <TransactionSection {...day.transactions} />
              </TableCell>
            </TableRow>
        ) }
      </TableBody>
    );
  }
}

export default withStyles(styles)(Day);

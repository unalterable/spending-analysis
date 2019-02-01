import React from 'react';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import withStyles from '@material-ui/core/styles/withStyles';

import TransactionTable from './TransactionTable.jsx';
import { formatDate, formatCurrency } from '../utils/format.js';


const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0,0,0,.125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  },
  expanded: {
    margin: 'auto',
  },
})(props => <MuiExpansionPanel {...props} />);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0,0,0,.03)',
    transition: 'background-color 2s',
    borderBottom: '1px solid rgba(0,0,0,.125)',
    marginBottom: -1,
    minHeight: 30,
    '&$expanded': {
      minHeight: 30,
    },
  },
  content: {
    margin: '5px 0',
    '&$expanded': {
      margin: '5px 0',
    },
  },
  expanded: {},
})(props => <MuiExpansionPanelSummary {...props} />);

ExpansionPanelSummary.muiName = 'ExpansionPanelSummary';

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    display: 'block',
  },
}))(props => <MuiExpansionPanelDetails {...props} />);

const styles = theme => ({
  highlighted: {
    backgroundColor: theme.palette.secondary.light,
  },
});

class Day extends React.Component {
  constructor(props){
    super(props);
    this.state = { highlighted: props.selected };
  }

  componentDidMount () {
    this.setState({ highlighted: false });/* setTimeout(() => this.setState({ highlighted: false }), 1000); */
  }

  render(){
    const { classes, day, onSizeChange, style } = this.props;
    return (
      <ExpansionPanel style={style} square={true} onChange={() => onSizeChange()} >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={this.state.highlighted ? classes.highlighted : ''}>
          <span style={{ width: '20%' }}>{formatDate(day.date)}</span>
          <span style={day.spending < -50000 ? {color: '#F00'} : {}} align="right">{formatCurrency(day.spending)}</span>
          <span align="right">{formatCurrency(day.income)}</span>
          <span align="right">{formatCurrency(day.rent)}</span>
          <span align="right">{formatCurrency(day.balance)}</span>
          <span align="right">{formatCurrency(day.amortisedBalance)}</span>
          <span align="right">{formatCurrency(day.spendingSoFarThisMonth)}</span>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {Object.keys(day.transactions).length > 0
            ? Object.entries(day.transactions).map(([name, transactions]) => (
                <TransactionTable key={name} title={name} transactions={transactions} />
            ))
            : (<div>No Transactions</div>)
          }
        </ExpansionPanelDetails>
      </ExpansionPanel>

    );
  }
}

export default withStyles(styles)(Day);

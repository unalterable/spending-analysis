import React from 'react';

import Grid from '@material-ui/core/Grid';
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
    padding: '0 40px 0 20px',
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
          <Grid container style={{ width: '90%', margin: 'auto' }}>
            <Grid item xs={2}>{formatDate(day.date)}</Grid>
            <Grid item xs style={{ textAlign: 'right', ...(day.spending < -50000 ? {color: '#F00'} : {}) }}>{formatCurrency(day.spending)}</Grid>
            <Grid item xs style={{ textAlign: 'right' }}>{formatCurrency(day.income)}</Grid>
            <Grid item xs style={{ textAlign: 'right' }}>{formatCurrency(day.rent)}</Grid>
            <Grid item xs style={{ textAlign: 'right' }}>{formatCurrency(day.balance)}</Grid>
            <Grid item xs style={{ textAlign: 'right' }}>{formatCurrency(day.amortisedBalance)}</Grid>
            <Grid item xs style={{ textAlign: 'right' }}>{formatCurrency(day.spendingSoFarThisMonth)}</Grid>
          </Grid>
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

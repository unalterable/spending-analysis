import React from 'react';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import Day from './Day.jsx';

const styles = theme => ({
  main: {
    display: 'block', // Fix IE 11 issue.
    width: 1000,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing.unit * 8,
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  section: { width: '70%', margin: '50px auto' },
});

const Statement = ({ classes, data }) => {
  const rows = data ? data.reverse().map(row => (
    <Day key={row.date} {...row} />
  )) : null;

  return (
    <Paper className={classes.main}>
      <table width="100%">
        <thead>
          <tr>
            <th>Date</th>
            <th>Spending</th>
            <th>Income</th>
            <th>Rent</th>
            <th>Balance</th>
            <th>Amortised Balance</th>
            <th>Spending This Month</th>
          </tr>
        </thead>
        {rows}
      </table>
    </Paper>
  );
};

export default withStyles(styles)(Statement);


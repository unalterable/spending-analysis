import React from 'react';
import Table from '@material-ui/core/Table';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import CellMeasurer, {
  CellMeasurerCache,
} from 'react-virtualized/dist/commonjs/CellMeasurer';
import { AutoSizer, List } from 'react-virtualized';
import TransactionSection from './TransactionSection.jsx';
import { formatDate, formatCurrency } from '../utils/format.js';

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

class Statement extends React.Component {
  constructor(props){
    super(props);
    this._cache = new CellMeasurerCache({ defaultHeight: 40, fixedWidth: true });
  }

  render () {
    const { classes, data = [] } = this.props;
    return (
      <Paper className={classes.main}>
        <Paper>
          <Table width="100%">
            <TableHead>
              <TableRow>
                <TableCell style={{ width: '20%' }}>Date</TableCell>
                <TableCell>Spending</TableCell>
                <TableCell>Income</TableCell>
                <TableCell>Rent</TableCell>
                <TableCell>Balance</TableCell>
                <TableCell>Amortised Balance</TableCell>
                <TableCell>Spending This Month</TableCell>
              </TableRow>
            </TableHead>
          </Table>
          <AutoSizer>
            {({width}) => (
              <List
                ref={(ref) => this.list = ref}
                height={800}
                width={width}
                rowCount={data.length}
                rowHeight={this._cache.rowHeight}
                rowRenderer={({ index, key, style, parent }) => (
                  <CellMeasurer
                    cache={this._cache}
                    columnIndex={0}
                    key={key}
                    rowIndex={index}
                    width={width}
                    parent={parent}
                  >
                    <div style={style}>
                      <ExpansionPanel onChange={() => this._resizeAll(index)}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                          <span style={{ width: '20%' }}>{formatDate(data[index].date)}</span>
                          <span style={data[index].spending < -50000 ? {color: '#F00'} : {}} align="right">{formatCurrency(data[index].spending)}</span>
                          <span align="right">{formatCurrency(data[index].income)}</span>
                          <span align="right">{formatCurrency(data[index].rent)}</span>
                          <span align="right">{formatCurrency(data[index].balance)}</span>
                          <span align="right">{formatCurrency(data[index].amortisedBalance)}</span>
                          <span align="right">{formatCurrency(data[index].spendingSoFarThisMonth)}</span>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                          <TransactionSection {...data[index].transactions} />
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                    </div>
                  </CellMeasurer>
                )}
              />
            )}
          </AutoSizer>
        </Paper>
      </Paper>
    );
  }

  _resizeAll (i) {
    setTimeout(() => {
      this._cache.clearAll(i);
      this.list.recomputeRowHeights(i);
    }, 300);
  }
}

export default withStyles(styles)(Statement);


import React from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import CellMeasurer, {
  CellMeasurerCache,
} from 'react-virtualized/dist/commonjs/CellMeasurer';
import { AutoSizer, List } from 'react-virtualized';
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
  tableContent: { height: '400px' },
});

class Statement extends React.Component {
  constructor(props){
    super(props);
    this._cache = new CellMeasurerCache({ defaultHeight: 40, fixedWidth: true });
  }

  render () {
    const { classes, data = [], focussedDate } = this.props;
    const selectedRow = data.findIndex(({ date }) => {
      return new Date(date).toString() === new Date(focussedDate).toString();
    });
    return (
      <Paper className={classes.main}>
        <Paper >
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
          <div className={classes.tableContent} >
            <AutoSizer>
              {({width}) => (
                <List
                  ref={(ref) => this.list = ref}
                  height={400}
                  width={width}
                  rowCount={data.length}
                  rowHeight={this._cache.rowHeight}
                  scrollToIndex={selectedRow}
                  rowRenderer={({ index, key, style, parent }) => (
                    <CellMeasurer cache={this._cache} columnIndex={0} key={key} rowIndex={index} width={width} parent={parent} >
                      <Day day={data[index]} style={style} onSizeChange={() => this._resizeAll(index)} selected={index === selectedRow}/>
                    </CellMeasurer>
                  )}
                />
              )}
            </AutoSizer>
          </div>
        </Paper>
      </Paper>
    );
  }

  _resizeAll (i) {
    setTimeout(() => {
      this._cache.clearAll(i);
      this.list.recomputeRowHeights(i);
    }, 200);
  }
}

export default withStyles(styles)(Statement);


import React from 'react';

import Grid from '@material-ui/core/Grid';
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
  titles: { padding: '0 131px 0 64px' },
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
          <div className={classes.titles}>
            <Grid container>
              <Grid item xs={2}>Date</Grid>
              <Grid item xs style={{ textAlign: 'right' }}>Spending</Grid>
              <Grid item xs style={{ textAlign: 'right' }}>Income</Grid>
              <Grid item xs style={{ textAlign: 'right' }}>Rent</Grid>
              <Grid item xs style={{ textAlign: 'right' }}>Balance</Grid>
              <Grid item xs style={{ textAlign: 'right' }}>Amortised Balance</Grid>
              <Grid item xs style={{ textAlign: 'right' }}>Spending This Month</Grid>
            </Grid>
          </div>
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


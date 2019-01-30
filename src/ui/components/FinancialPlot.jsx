import React from 'react';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries, Crosshair, Highlight, Borders } from 'react-vis';

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

class FinancialPlot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSingleClick() {
    console.log('crosshair', this.state.crosshair);
    /* this.setState({ }); */
  }

  handleDoubleClick() {
    this.setState({ zoomedRange: null });
  }

  handleBrushEvent(area){
    if (area) {
      setTimeout(() => {
        this.clearClickTimeout();
        this.setState({ zoomedRange: area });
      }, 0);
    }
  }

  clearClickTimeout() {
    clearTimeout(this.clickTimeout);
    this.clickTimeout = null;
  }

  handleClick() {
    if (this.clickTimeout) {
      this.clearClickTimeout();
      this.handleDoubleClick();
    } else {
      this.clickTimeout = setTimeout(()=>{
        this.clearClickTimeout();
        this.handleSingleClick();
      }, 500);
    }
  }

  render(){
    const { classes, data = [] } = this.props;
    const { crosshair, zoomedRange } = this.state;
    return (
      <Paper className={classes.main}>
        <XYPlot
          width={900}
          height={400}
          xType="time"
          onClick={() => this.handleClick()}
          xDomain={zoomedRange && [ zoomedRange.left, zoomedRange.right ]}
          animation={{ duration: 100 }}
        >
          <HorizontalGridLines />
          <LineSeries
            onNearestX={(datapoint) => this.setState({ crosshair: [datapoint] })}
            stroke="blue"
            data={data.map(({ date, balance }) => ({ x: new Date(date), y: balance/100 }))}
          />
          <LineSeries
            stroke="lightBlue"
            data={data.map(({ date, amortisedBalance }) => ({ x: new Date(date), y: amortisedBalance/100 }))}
          />
          <LineSeries
            stroke="red"
            data={data.map(({ date, spendingSoFarThisMonth }) => ({ x: new Date(date), y: spendingSoFarThisMonth/100 }))}
          />
          <Crosshair values={crosshair} />
          <Highlight
            enableY={false}
            onBrushEnd={area => this.handleBrushEvent(area)}
          />
          <Borders style={{all: {fill: '#fff'}}} />
          <XAxis />
          <YAxis />
        </XYPlot>
      </Paper>
    );
  };
}

export default withStyles(styles)(FinancialPlot);


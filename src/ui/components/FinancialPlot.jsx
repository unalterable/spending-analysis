import React from 'react';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries, Crosshair} from 'react-vis';

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

const month = date => moment(date).format('MM-YYYY');

class FinancialPlot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render(){
    const { classes, data = [] } = this.props;
    const shownData = this.state.zoom ? data.filter(({ date }) => (month(date) === month(this.state.crosshair[0].x))) : data;
    return (
      <Paper className={classes.main}>
        <XYPlot
          width={900}
          height={400}
          xType="time"
          onClick={() => this.setState({ zoom: !this.state.zoom })}
        >
          <HorizontalGridLines />
          <XAxis
          />
          <YAxis />
          <LineSeries
            onNearestX={(datapoint) => this.setState({ crosshair: [datapoint] })}
            stroke="blue"
            data={shownData.map(({ date, balance }) => (
              { x: new Date(date), y: balance/100 }
            ))}
          />
          <LineSeries
            stroke="lightBlue"
            data={shownData.map(({ date, amortisedBalance }) => (
              { x: new Date(date), y: amortisedBalance/100 }
            ))}
          />
          <LineSeries
            stroke="red"
            data={shownData.map(({ date, spendingSoFarThisMonth }) => (
              { x: new Date(date), y: spendingSoFarThisMonth/100 }
            ))}
          />
          <Crosshair values={this.state.crosshair} />
        </XYPlot>
      </Paper>
    );
  };
}

export default withStyles(styles)(FinancialPlot);


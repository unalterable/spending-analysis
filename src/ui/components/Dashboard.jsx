import React from 'react';
import Statement from './Statement.jsx';
import FinancialPlot from './FinancialPlot.jsx';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({});

class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  render(){
    const { data } = this.props;
    return (
      <div>
        <FinancialPlot data={data} focusDate={(date) => this.setState({ focussedDate: date })}/>
        <Statement data={data} focussedDate={this.state.focussedDate} />
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);


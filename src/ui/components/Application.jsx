import React from 'react';
import axios from 'axios';
import FinancialPlot from './FinancialPlot.jsx'
import DataSection from './DataSection.jsx'

class Application extends React.Component {

  constructor(props) {
    super(props);
    this.state = { data: null }
    axios.get('http://localhost:3000/data').then(({ data }) => this.setState({ data }));
  }

  render () {
    return (
      <div>
        <FinancialPlot data={this.state.data} />
        <DataSection data={this.state.data} />
      </div>
    );
  }
};

export default Application;

import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import FinancialPlot from './FinancialPlot.jsx'
import Statement from './Statement.jsx'
import Importer from './Importer.jsx';

const Main = ({ data}) => (
  <div>
    <FinancialPlot data={data} />
    <Statement data={data} />
  </div>
);

class Application extends React.Component {

  constructor(props) {
    super(props);
    this.state = { data: null }
    axios.get('http://localhost:3000/data').then(({ data }) => this.setState({ data }));
  }

  render () {
    return (
      <Router>
        <div>
          <div>
            <Link to="/">Home</Link>
            <Link to="/importer">Importer</Link>
          </div>
          <hr />
          <Route exact path="/" render={() => <Main data={this.state.data} />} />
          <Route path="/importer" component={Importer} />
        </div>
      </Router>
    );
  }
};

export default Application;

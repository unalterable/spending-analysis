import React from 'react';
import Route from 'react-router-dom/Route';
import Link from 'react-router-dom/Link';
import axios from 'axios';
import purple from '@material-ui/core/colors/purple';
import red from '@material-ui/core/colors/red';
import Button from '@material-ui/core/Button';
import Theme from './Theme.jsx';
import TopNav from './components/TopNav.jsx';
/* import FinancialPlot from './components/FinancialPlot.jsx'; */
import Statement from './components/Statement.jsx';
import Importer from './components/Importer.jsx';

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      primaryColour: purple,
    };
  }

  componentDidMount() {
    console.log('21127', 21127)
    axios.get('http://localhost:3000/api/data').then(({ data }) => this.setState({ data }));
  }

  render() {
    return (
      <Theme primary={this.state.primaryColour}>
        <TopNav />
        <div>
          <div>
            <Link to="/">Home</Link>
            <Link to="/importer">Importer</Link>
          </div>
          <hr />
          <Route
            exact
            path="/"
            component={() => (
              <div>
                <Statement data={this.state.data} />
              </div>
            )}
          />
          <Route path="/importer" component={Importer} />
        </div>
      </Theme>
    );
  }
}

export default Application;

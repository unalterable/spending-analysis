import React from 'react';
import Route from 'react-router-dom/Route';
import axios from 'axios';
import purple from '@material-ui/core/colors/purple';
import Theme from './Theme.jsx';
import TopNav from './components/TopNav.jsx';
import Importer from './components/Importer.jsx';
import Dashboard from './components/Dashboard.jsx';
import RentStrings from './components/RentStrings.jsx';


class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      primaryColour: purple,
    };
  }

  componentDidMount() {
    axios.get('/spending-analysis/api/data').then(({ data }) => this.setState({ data }));
  }

  render() {
    return (
      <Theme primary={this.state.primaryColour}>
        <TopNav />
        <div>
          <Route
            exact
            path="/spending-analysis/"
            component={(props) => <Dashboard {...props} data={this.state.data} />}
          />
          <Route path="/spending-analysis/importer" component={Importer} />
          <Route path="/spending-analysis/rent-strings" component={RentStrings} />
        </div>
      </Theme>
    );
  }
}

export default Application;

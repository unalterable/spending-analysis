import React from 'react';
import axios from 'axios';
import mapValues from 'lodash/mapValues';
import keyBy from 'lodash/keyBy';
import merge from 'lodash/merge';
import parseCSV from 'csv-parse/lib/sync';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

import transaction from '../../shared/transaction.js';
import TransactionTable from './TransactionTable.jsx';

const REQUIRED_KEYS = ['Date', 'Description', 'Value', 'Balance'];

const HEADERS_MAPPED = 'HeadersMapped';
const DATA_PARSED = 'DataParsed';
const INITIAL_INPUT = 'InitialInput';

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
  textAreaInput: {
    width: '100%',
    height: '700px',
  },
});

class Importer extends React.Component {
  constructor(){
    super();
    this.state = { };
  }

  recordInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  parsePotentialImports(){
    const parsedData = parseCSV(this.state[INITIAL_INPUT], { columns: true });
    this.setState({
      stage: DATA_PARSED,
      parsedData,
      headerMappings: keyBy(REQUIRED_KEYS.filter(k => parsedData[0][k])),
    });
  }

  changeHeaderMapping(e) {
    this.setState(merge({}, this.state, { headerMappings: { [e.target.name]: e.target.value }}));
  }

  mapHeaders() {
    this.setState(Object.assign({}, this.state, {
      stage: HEADERS_MAPPED,
      parsedData: this.state.parsedData.map(datum => mapValues(this.state.headerMappings, k => datum[k])),
    }));
  }

  saveImports() {
    axios.post('/spending-analysis/api/save-transactions', this.state.parsedData);
  }

  render() {
    const { classes } = this.props;
    if(this.state.stage === HEADERS_MAPPED) {
      return (
        <Paper className={classes.main}>
          <TransactionTable transactions={this.state.parsedData.map(transaction)} />
          <Button onClick={this.saveImports.bind(this)}>Save</Button>
        </Paper>
      );
    } else if (this.state.stage === DATA_PARSED) {
      const parsedHeaders = Object.keys(this.state.parsedData[0]);
      return (
        <Paper className={classes.main}>
          <button onClick={this.mapHeaders.bind(this)}>Map Headers</button>
          {REQUIRED_KEYS.map((requiredKey, i) => (
            <div key={i}>
              {requiredKey}
              <select
                name={requiredKey}
                value={this.state.headerMappings[requiredKey]}
                onChange={this.changeHeaderMapping.bind(this)}
              >
                <option disabled selected>Please Select</option>
                {parsedHeaders.map(parsedHeader => (
                  <option key={parsedHeader} value={parsedHeader} >
                    {parsedHeader}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </Paper>
      );
    }
    return (
      <Paper className={classes.main}>
        <textarea name={INITIAL_INPUT} onChange={this.recordInput.bind(this)} className={classes.textAreaInput} />
        <Button onClick={this.parsePotentialImports.bind(this)}>Parse</Button>
      </Paper>
    );
  }
}

export default withStyles(styles)(Importer);


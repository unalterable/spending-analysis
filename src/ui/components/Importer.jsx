import React from 'react';
import axios from 'axios';
import mapValues from 'lodash/mapValues';
import keyBy from 'lodash/keyBy';
import merge from 'lodash/merge';
import parseCSV from 'csv-parse/lib/sync';
import transaction from '../../shared/transaction.js';
import TransactionTable from './TransactionTable.jsx';

const REQUIRED_KEYS = ['Date', 'Description', 'Value', 'Balance'];

const HEADERS_MAPPED = 'HeadersMapped';
const DATA_PARSED = 'DataParsed';
const INITIAL_INPUT = 'InitialInput';

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
    axios.post('http://localhost:3000/save-transactions', this.state.parsedData);
  }

  render() {
    if(this.state.stage === HEADERS_MAPPED) {
      return (
        <div>
          <button onClick={this.saveImports.bind(this)}>Save</button>
          <TransactionTable transactions={this.state.parsedData.map(transaction)} />
        </div>
      );
    } else if (this.state.stage === DATA_PARSED) {
      const parsedHeaders = Object.keys(this.state.parsedData[0]);
      return (
        <div>
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
                  <option
                    key={parsedHeader}
                    value={parsedHeader}
                  >
                    {parsedHeader}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      );
    }
    return (
      <div>
        <button onClick={this.parsePotentialImports.bind(this)}>Parse</button>
        <textarea name={INITIAL_INPUT} onChange={this.recordInput.bind(this)} />
      </div>
    );
  }
}

export default Importer;


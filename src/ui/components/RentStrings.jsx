import React from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

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

const initialState = { disableInput: false, rentString: '' };

class RentStrings extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  sendNewRentString() {
    this.setState({ disableInput: true });
    axios.put('/spending-analysis/api/rent-string', { newRentString: this.state.rentString })
      .then(() => this.setState(initialState));
  }

  render(){
    const { classes } = this.props;
    return (
      <Paper className={classes.main}>
        <form noValidate autoComplete="off">
          <TextField
            label="Rent String"
            className={classes.textField}
            value={this.state.rentString}
            disabled={this.state.disableInput}
            onChange={(e) => this.setState({ rentString: e.target.value })}
          />
          <Button onClick={() => this.sendNewRentString()}>Submit</Button>
        </form>
      </Paper>
    );
  };
}

export default withStyles(styles)(RentStrings);


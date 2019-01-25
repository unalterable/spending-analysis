import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from 'react-router-dom/Link';

/* import MenuIcon from '@material-ui/icons/Menu'; */

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
  },
  menuButton: {
    color: theme.palette.primary.contrastText,
    margin: theme.spacing.unit,
  },
});

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" >Spending Analysis</Typography>
          <Link to="/spending-analysis/" className={classes.link}>
            <Button variant="outlined" className={classes.menuButton}>Home</Button>
          </Link>
          <Link to="/spending-analysis/importer" className={classes.link}>
            <Button variant="outlined" className={classes.menuButton}>Importer</Button>
          </Link>
          <Link to="/spending-analysis/rent-strings" className={classes.link}>
            <Button variant="outlined" className={classes.menuButton}>Rent Strings</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);

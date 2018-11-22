import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import moment from "moment";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

class DateAndTimePickers extends Component {
  onChange(e) {
    this.props.setDate(e);
  }

  render() {
    const { classes, label, dateName } = this.props;
    var tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = new Date(Date.now() - tzoffset)
      .toISOString()
      .slice(0, -1);
    console.log("CURRENT", localISOTime, dateName);

    return (
      <form className={classes.container} noValidate>
        <TextField
          id="datetime-local"
          label={label}
          type="datetime-local"
          defaultValue={localISOTime}
          name={dateName}
          onChange={this.onChange.bind(this)}
          className={classes.textField}
          InputLabelProps={{ shrink: true }}
        />
      </form>
    );
  }
}

DateAndTimePickers.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DateAndTimePickers);

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
class DatePicker extends Component {
  onChange(e) {
    this.props.setDate(e);
  }

  render() {
    const { classes, label, dateName } = this.props;
    const dateValue = moment(Date.now()).format("YYYY-MM-DD");

    return (
      <form className={classes.container} noValidate>
        <TextField
          id="date"
          label={label}
          type="date"
          defaultValue={dateValue}
          name={dateName}
          className={classes.textField}
          onChange={this.onChange.bind(this)}
          InputLabelProps={{
            shrink: true
          }}
        />
      </form>
    );
  }
}

DatePicker.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DatePicker);

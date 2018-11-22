import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class SelectDropdown extends React.Component {
  state = {
    value: "",
    name: "hai",
    labelWidth: 0
  };

  componentDidMount() {}

  handleChange = event => {
    console.log(
      "event.target.name",
      event.target.name,
      "event.target.value",
      event.target.value
    );
    this.setState({ [event.target.name.name]: event.target.value });
  };

  render() {
    const { classes, values, name } = this.props;
    let menuItems = "";
    if (values.length > 0) {
      menuItems = values.map((data, index) => {
        return (
          <MenuItem key={"menu" + index} value={data}>
            {data}
          </MenuItem>
        );
      });
    }

    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor={name}>{name}</InputLabel>
        <Select
          value={this.state.value}
          onChange={this.handleChange}
          inputProps={{
            name: { name },
            id: ""
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {menuItems}
        </Select>
      </FormControl>
    );
  }
}
SelectDropdown.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SelectDropdown);

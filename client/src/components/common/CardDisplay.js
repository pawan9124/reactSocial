import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { setSingleLocation } from "../../actions/dashboardActions";
import { Link } from "react-router-dom";

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
};

class CardDisplay extends Component {
  setLocation(id) {
    this.props.setSingleLocation(id);
  }

  render() {
    const { classes, locations } = this.props;

    const returnCard = locations.map((data, index) => {
      return (
        <div className="col-md-3 mt-5" key={Date.now() + "" + index}>
          <Card className={classes.card}>
            <CardActionArea>
              <Link
                onClick={this.setLocation.bind(this, data._id)}
                to={`/feed/${data.city}`}
              >
                <CardMedia
                  className={classes.media}
                  image={
                    data.image !== null && data.image !== ""
                      ? data.image
                      : require("../../imageUploads/default_location.png")
                  }
                  title={data.city}
                />
              </Link>
              <CardContent>
                <Typography gutterBottom variant="h6" component="p">
                  {data.city},
                </Typography>
                <Typography gutterBottom component="p">
                  {data.state}({data.zipcode}),{data.country}
                </Typography>
                <Typography component="p">{data.description}</Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Link
                onClick={this.setLocation.bind(this, data._id)}
                to={`/feed/${data.city}`}
              >
                Explore
              </Link>
            </CardActions>
          </Card>
        </div>
      );
    });
    return returnCard !== undefined ? returnCard : "";
  }
}

CardDisplay.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  null,
  { setSingleLocation }
)(withStyles(styles)(CardDisplay));

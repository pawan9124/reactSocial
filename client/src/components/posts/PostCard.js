import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Comment";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deletePost, deleteComment } from "../../actions/postActions";
import { addLike } from "../../actions/postActions";
import { removeLike } from "../../actions/postActions";
import { addComment } from "../../actions/postActions";
import ImageGallery from "../common/ImageGallery";

const styles = theme => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: "auto",
    [theme.breakpoints.up("sm")]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
});

class PostCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      text: "",
      errors: {},
      post: this.props.singlePost
    };
    this.onDeletePost = this.onDeletePost.bind(this);
    this.onDeleteComment = this.onDeleteComment.bind(this);
    this.onLikeClick = this.onLikeClick.bind(this);
    this.onUnlikeClick = this.onUnlikeClick.bind(this);
    this.findUserLike = this.findUserLike.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmitComment = this.onSubmitComment.bind(this);
  }
  onDeletePost(id) {
    this.props.deletePost(id);
  }
  onDeleteComment(postId, commentId) {
    this.props.deleteComment(postId, commentId);
  }
  onLikeClick(id) {
    this.props.addLike(id);
  }
  onUnlikeClick(id) {
    this.props.removeLike(id);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.post) {
      this.setState({ post: nextProps.post.post });
    }
  }
  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmitComment(postId) {
    const { user } = this.props.auth;

    const newComment = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addComment(postId, newComment);
    this.setState({ text: "" });
  }

  render() {
    const { classes, auth } = this.props;
    const { errors, post } = this.state;
    let commentsList, dropdown;
    let userLiked = this.findUserLike(post.likes);
    commentsList = post.comments.map((comment, index) => {
      return (
        <div className="row" key={"comment" + index}>
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={comment.avatar}
                alt=""
              />
            </a>
            <p className="text-center input-text-color">{comment.name}</p>
          </div>
          <div className="col-md-9">
            <p className="lead input-text-color">{comment.text}</p>
          </div>
          <div className="col-md-1 no-padding">
            {comment.user === auth.user.id ? (
              <i
                onClick={this.onDeleteComment.bind(this, post._id, comment._id)}
                className="icon-black tim-icons icon-trash-simple"
              />
            ) : null}
          </div>
          <hr style={{ width: "100%" }} />
        </div>
      );
    });

    dropdown = (
      <div>
        <IconButton
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <MoreVertIcon />
        </IconButton>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {post.user === auth.user.id ? (
            <a
              href="#l"
              onClick={this.onDeletePost.bind(this, post._id)}
              className="dropdown-item"
            >
              Delete Post
            </a>
          ) : null}
        </div>
      </div>
    );

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              <Link to={`/profile/${post.user}`}>
                <img
                  className="rounded-circle d-none d-md-block"
                  src={post.avatar}
                  alt=""
                />
              </Link>
            </Avatar>
          }
          action={dropdown}
          title={post.name}
          subheader="September 14, 2016"
        />{" "}
        {/* <CardMedia className={classes.media} title="Paella dish" /> */}
        <ImageGallery images={post.images} />
        <CardContent>
          <Typography component="p">{post.text}</Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <span className="badge badge-pill badge-success">
            {post.likes.length}
          </span>

          {!userLiked ? (
            <IconButton
              aria-label="Add to favorites"
              onClick={() => this.onLikeClick(post._id)}
            >
              <FavoriteIcon color="action" />
            </IconButton>
          ) : (
            <IconButton onClick={() => this.onUnlikeClick(post._id)}>
              <FavoriteIcon color="secondary" />
            </IconButton>
          )}

          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <CommentIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {commentsList}
            <div className="input-group">
              <input
                type="text"
                className="input-text-color form-control"
                placeholder="Add Comment"
                name="text"
                value={this.state.text}
                onChange={this.onChange}
                error={errors.text}
              />
              <div
                onClick={() => this.onSubmitComment(post._id)}
                style={{ cursor: "pointer" }}
                className="input-group-append"
              >
                <span className="input-group-text">
                  <i className="icon-black tim-icons icon-send" />
                </span>
              </div>
            </div>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

PostCard.defaultProps = {
  showActions: true
};

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post
});

export default connect(
  mapStateToProps,
  {
    deletePost,
    addLike,
    removeLike,
    addComment,
    deleteComment
  }
)(withStyles(styles)(PostCard));

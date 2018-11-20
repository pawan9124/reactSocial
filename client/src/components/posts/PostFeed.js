import React, { Component } from "react";
import PropTypes from "prop-types";
// import PostItem from "./PostItem";
import PostCard from "./PostCard";

class PostFeed extends Component {
  render() {
    const { posts } = this.props;

    return posts.map(post => (
      <div className="col-md-4">
        <PostCard key={post._id} post={post} />
      </div>
    ));
  }
}
PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostFeed;

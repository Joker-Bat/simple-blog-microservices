import React, { useState } from "react";

import axios from "axios";

const CommentCreate = ({ postId }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
      content: comment,
    });

    setComment("");
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>New comment</label>
          <input
            className="form-control mb-4"
            value={comment}
            onChange={handleCommentChange}
          />
        </div>
        <button className="btn btn-primary mb-2">Submit</button>
      </form>
    </div>
  );
};

export default CommentCreate;

import React from "react";

const CommentList = ({ comments }) => {
  return (
    <div>
      <ul>
        {comments.length > 0 &&
          comments.map((comment) => {
            let content;
            let color = "black";
            if (comment.status === "approved") {
              content = comment.content;
            } else if (comment.status === "pending") {
              content = "This comment is awaiting moderation";
              color = "yellow";
            } else if (comment.status === "rejected") {
              content = "This comment has been rejected";
              color = "red";
            }
            return (
              <li key={comment.id} style={{ color }}>
                {content}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default CommentList;

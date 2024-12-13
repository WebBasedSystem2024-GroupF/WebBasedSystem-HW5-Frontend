import React from 'react';

interface CommentProps {
  author_name: string;
  text: string;
  rating: number;
}

const Comment: React.FC<CommentProps> = ({ author_name, text, rating }) => {
  return (
    <div className="comment">
      <strong>{author_name}</strong>
      <span>(Rating: {rating})</span>
      <p>{text}</p>
    </div>
  );
};

export default Comment;
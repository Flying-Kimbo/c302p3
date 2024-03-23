'use client'

import React, { useState } from 'react';
import styles from './page.module.css';

const InstructorReview = () => {
  // Dummy assignment review data
  const [rubric, setRubric] = useState([
    { id: 1, name: 'Content', maxPoints: 10, points: 8 },
    { id: 2, name: 'Organization', maxPoints: 5, points: 4 },
    { id: 3, name: 'Grammar', maxPoints: 5, points: 5 },
    // Add more categories as needed
  ]);

  const [comments, setComments] = useState([
    { id: 1, highlight: 'Introduction', content: 'Well done on introducing the topic clearly.' },
    { id: 2, highlight: 'Conclusion', content: 'A stronger conclusion could summarize the main points more effectively.' },
    // Add more comments as needed
  ]);

  const handleMarkChange = (categoryIndex, points) => {
    // Handle mark change functionality here
    console.log(`Category Index: ${categoryIndex}, Points: ${points}`);
  };

  const handleCommentChange = (commentId, content) => {
    // Handle comment change functionality here
    console.log(`Comment ID: ${commentId}, Content: ${content}`);
  };

  return (
    <div>
      <h1>Instructor Review</h1>
      <div className={styles.reviewContainer}>
        <div className={styles.column}>
          <h2>Grade</h2>
          <div className={styles.rubric}>
            {rubric.map((category, index) => (
              <div key={category.id}>
                <h3>{category.name}</h3>
                <input
                  type="number"
                  value={category.points}
                  min={0}
                  max={category.maxPoints}
                  onChange={(e) => handleMarkChange(index, e.target.value)}
                />
                <span> / {category.maxPoints}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.column}>
          <h2>Assignment</h2>
          {/* Placeholder for assignment view */}
          <div className={styles.assignmentView}>
            <p>Assignment view will be displayed here</p>
          </div>
        </div>
        <div className={styles.column}>
          <h2>Comments</h2>
          <div className={styles.comments}>
            {comments.map((comment) => (
              <div key={comment.id}>
                <p><strong>{comment.highlight}:</strong></p>
                <textarea
                  value={comment.content}
                  onChange={(e) => handleCommentChange(comment.id, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorReview;

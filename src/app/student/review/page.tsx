'use client'

import React from 'react';
import styles from './page.module.css';

const AssignmentReview = () => {
  // Dummy assignment review data
  const assignmentReview = {
    rubric: {
      categories: [
        { name: 'Content', maxPoints: 10, points: 8 },
        { name: 'Organization', maxPoints: 5, points: 4 },
        { name: 'Grammar', maxPoints: 5, points: 5 },
        // Add more categories as needed
      ],
    },
    gradePercentage: 86,
    gradeLetter: 'B+',
    comments: [
      { highlight: 'Introduction', content: 'Well done on introducing the topic clearly.' },
      { highlight: 'Conclusion', content: 'A stronger conclusion could summarize the main points more effectively.' },
      // Add more comments as needed
    ],
  };

  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <h2>Grade</h2>
        <div className={styles.gradeInfo}>
          <div className={styles.rubric}>
            <h3>Rubric</h3>
            <ul>
              {assignmentReview.rubric.categories.map((category, index) => (
                <li key={index}>{category.name}: {category.points}/{category.maxPoints}</li>
              ))}
            </ul>
            <button onClick={() => window.open('#', '_blank')}>View Rubric</button>
          </div>
          <div className={styles.grade}>
            <h3>Grade</h3>
            <p>Percentage: {assignmentReview.gradePercentage}%</p>
            <p>Letter Grade: {assignmentReview.gradeLetter}</p>
          </div>
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
          {assignmentReview.comments.map((comment, index) => (
            <div key={index}>
              <p><strong>{comment.highlight}:</strong> {comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssignmentReview;

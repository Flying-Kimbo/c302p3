'use client'

import React, { useState } from 'react';
import styles from './page.module.css';
import * as yaml from 'js-yaml'; // Import the js-yaml library
import { Tooltip } from 'react-tooltip';

import Footer from './footer';

const StudentGradeSummary = (_rubricData, _studentMarksData) => {
  // Assuming rubric data and student marks data are available
  const rubricData = [
    { category: "Grammar", max_marks: 10 },
    { category: "Content", max_marks: 20 }
    // Add more rubric categories as needed
  ];

  const studentMarksData = [
    { category: "Grammar", student_marks: 8 },
    { category: "Content", student_marks: 15 }
    // Add student marks for each category
  ];

  // Calculate total marks and total student marks
  const totalMarks = rubricData.reduce((total, { max_marks }) => total + max_marks, 0);
  const totalStudentMarks = studentMarksData.reduce((total, { student_marks }) => total + student_marks, 0);

  // Function to show rubric
  const handleShowRubric = () => {
    // Logic to show rubric
    console.log("Show rubric");
  };

  return (
    <div className={styles['left-column-content']}>
      <button className={styles['grade-summary-button']} onClick={handleShowRubric}>
        Show Rubric
      </button>
      <table className={styles['grade-summary-table']}>
        <thead>
          <tr>
            <th>Category</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {rubricData.map(({ category, max_marks }, index) => {
            const studentMarks = studentMarksData[index]?.student_marks || 0;
            const gradeFraction = `${studentMarks}/${max_marks}`;
            return (
              <tr key={category}>
                <td>{category}</td>
                <td>{gradeFraction}</td>
              </tr>
            );
          })}
          <tr className={styles['grade-summary-total']}>
            <td>Total</td>
            <td>{`${totalStudentMarks}/${totalMarks}`}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const StudentReviewPage = () => {
  // Example YAML content (replace with actual content loaded from file)
  const yamlContent = `
    rubric:
      - category: Grammar
        max_marks: 10
      - category: Content
        max_marks: 20

    comments:
      - position:
          start: 100
          end: 150
        content: "You need to work on your grammar in this paragraph."
      - position:
          start: 200
          end: 250
        content: "Great job on including relevant content here!"

    general:
      - comment: Lorem Ipsum dolet sit amur
      - comment: This is yet another comment, I don't quite know what I am commenting on
      - comment: YAAAAAA
  `;

  // Parse YAML content
  const data = yaml.load(yamlContent);

  // Extract rubric and comments from data object
  const { rubric, comments, general } = data;

  // Text content of the assignment
  let assignmentContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  assignmentContent = assignmentContent.repeat(10); // uncomment to extend lorem ipsum to test scrolling

  const [tooltipContent, setTooltipContent] = useState(""); // State to hold tooltip content
  const [tooltipPosition, setTooltipPosition] = useState({}); // State to hold tooltip position

  // Render comments with highlighted text
  return (
    <div className={styles['main-layout']}>
      <div className={styles['review-page']}>
        <div className={styles['left-column']}>
          <h2>English</h2>
          <div className={`${styles['assignment-details']}`}> {/* Apply left-column-content style here */}
            <h3>Rubric Details</h3>
          </div>
          <div className={`${styles['assignment-details-widget']}`}>
            {StudentGradeSummary('', '')}
          </div>
        </div>
        <div className={styles['center-column']}>
          <div className={styles['assignment-header']}>
            <h1>Assignment Name</h1>
          </div>
          <div className={styles['ipsum-content']}>
            <h2>Assignment Content</h2>
            {/* Split the assignment content and wrap sections corresponding to comments with spans */}
            {comments.map((comment, index) => {
              const { start, end } = comment.position;
              const beforeComment = assignmentContent.slice(0, start);
              const commentText = assignmentContent.slice(start, end);
              const afterComment = assignmentContent.slice(end);
              return (
                <React.Fragment key={index}>
                  <span>{beforeComment}</span>
                  <span
                    className={styles['highlighted-text']}
                    data-tooltip-id="comment-tooltip"
                    data-tooltip-content={comment.content}
                    data-tooltip-place="top"
                  >
                    {commentText}
                  </span>
                  <span>{afterComment}</span>
                </React.Fragment>
              );
            })}
              <Tooltip
                id="comment-tooltip"
              />
          </div>
        </div>
        <div className={styles['right-column']}>
          <div className={styles['right-column-content']}>
            <h2>Assignment Comments</h2>
            <ul>
              {general.map((general, index) => (
                <li key={index}>{general.comment}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StudentReviewPage;

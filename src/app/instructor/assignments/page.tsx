'use client'

import React, { useState } from 'react';
import styles from './page.module.css';

const InstructorAssignments = () => {
  // Dummy assignments data
  const [assignments, setAssignments] = useState([
    { id: 1, name: 'Assignment 1', dueDate: '2024-03-20', marked: true },
    { id: 2, name: 'Assignment 2', dueDate: '2024-03-25', marked: false },
    { id: 3, name: 'Assignment 3', dueDate: '2024-04-01', marked: true },
    // Add more assignments as needed
  ]);

  const handleReview = (assignmentId) => {
    // Handle review functionality here
    console.log(`Reviewing assignment with ID: ${assignmentId}`);
    location.href="/instructor/assignments/review"
  };

  const handlePublishMarks = (assignmentId) => {
    // Handle publish marks functionality here
    console.log(`Publishing marks for assignment with ID: ${assignmentId}`);
  };

  const handleNewAssignment = () => {
    // Handle creation of a new assignment functionality here
    console.log('Creating a new assignment');
    location.href="/instructor/assignments/create"
  };

  return (
    <div>
      <h1>Instructor Assignments</h1>
      <div className={styles.buttons}>
        <button onClick={handleNewAssignment}>Create New Assignment</button>
      </div>
      <div className={styles.assignmentsContainer}>
        {assignments.map((assignment) => (
          <div key={assignment.id} className={styles.assignmentTile}>
            <h3>{assignment.name}</h3>
            <p>Due Date: {assignment.dueDate}</p>
            <div className={styles.actions}>
              <button onClick={() => handleReview(assignment.id)}>Review</button>
              {assignment.marked ? (
                <button onClick={() => handlePublishMarks(assignment.id)}>Publish Marks</button>
              ) : (
                <div className={styles.dropdown}>
                  <button className={styles.dropbtn}>Review Students</button>
                  <div className={styles.dropdownContent}>
                    <p>Students Marked: Yes</p>
                    {/* Placeholder for list of students */}
                    <p>Students Not Marked: No</p>
                    {/* Placeholder for list of students */}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstructorAssignments;

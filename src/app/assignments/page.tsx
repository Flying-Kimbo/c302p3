import React from 'react';
import styles from './page.module.css';

const assignmentsData = [
  { id: 1, name: 'Assignment 1', dueDate: '2024-03-20' },
  { id: 2, name: 'Assignment 2', dueDate: '2024-03-25' },
  { id: 3, name: 'Assignment 3', dueDate: '2024-04-01' },
  // Add more assignments as needed
];

const Assignments = () => {
  return (
    <div>
      <h1>Assignments</h1>
      <div className={styles['assignments-container']}>
        {assignmentsData.map((assignment) => (
          <div key={assignment.id} className={styles['assignment-tile']}>
            <h3>{assignment.name}</h3>
            <p>Due Date: {assignment.dueDate}</p>
            <button>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assignments;

import React from 'react';
import styles from './page.module.css';

const coursesData = [
  { id: 1, name: 'Mathematics' },
  { id: 2, name: 'English' },
  // Add more courses as needed
];

const assignmentsData = [
  { id: 1, courseId: 1, name: 'Assignment 1', dueDate: 'March 20, 2024', submitted: true, weight: '20%' },
  { id: 2, courseId: 1, name: 'Assignment 2', dueDate: 'March 25, 2024', submitted: false, weight: '30%' },
  { id: 3, courseId: 2, name: 'Assignment 1', dueDate: 'March 20, 2024', submitted: false, weight: '25%' },
  { id: 4, courseId: 2, name: 'Assignment 2', dueDate: 'March 25, 2024', submitted: false, weight: '25%' },
  { id: 5, courseId: 2, name: 'Assignment 3', dueDate: 'March 25, 2024', submitted: false, weight: '25%' },
  // Add more assignments as needed
];

const StudentAssignments = () => {
  return (
    <div className={styles['student-assignments']}>
      {coursesData.map((course) => (
        <div key={course.id} className={styles['course-container']}>
          <div className={styles['course-info']}>
            <h2>{course.name}</h2>
          </div>
          <div className={styles['assignment-list']}>
            {assignmentsData
              .filter((assignment) => assignment.courseId === course.id)
              .map((assignment) => (
                <div key={assignment.id} className={styles.assignment}>
                  <h3 className={styles['assignment-title']}>{assignment.name}</h3>
                  <p>Due Date: {assignment.dueDate}</p>
                  <p>Weight: {assignment.weight}</p>
                  <button className={`${styles['assignment-button']} ${assignment.submitted ? styles['assignment-submitted'] : styles['assignment-not-submitted']}`}>
                    {assignment.submitted ? 'Submitted' : 'Not Submitted'}
                  </button>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentAssignments;

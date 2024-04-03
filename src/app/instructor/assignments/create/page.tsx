'use client'

import React, { useState } from 'react';
import styles from './page.module.css';
import Page, { Header, Body } from "../../../../components/Page";

const CreateAssignment = () => {
  const [assignmentName, setAssignmentName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [associatedClass, setAssociatedClass] = useState('');
  const [rubricCategories, setRubricCategories] = useState([{ name: 'Category 1', maxMarks: 10, marks: 5 }]);

  const handleAddCategory = () => {
    setRubricCategories([...rubricCategories, { name: '', maxMarks: 10, marks: 5 }]);
  };

  const handleRemoveCategory = (index) => {
    const updatedCategories = [...rubricCategories];
    updatedCategories.splice(index, 1);
    setRubricCategories(updatedCategories);
  };

  const handleCategoryChange = (index, key, value) => {
    const updatedCategories = [...rubricCategories];
    updatedCategories[index][key] = value;
    setRubricCategories(updatedCategories);
  };

  const handleRubricValueChange = (index, value) => {
    const updatedCategories = [...rubricCategories];
    updatedCategories[index].marks = value;
    setRubricCategories(updatedCategories);
  };

  const handleCreateAssignment = () => {
    // Handle creation of assignment functionality here
    console.log('Creating assignment...');
    location.href="/instructor/assignments"
  };

  return (
    <Page>
      <Header text="Create Assignment" />
      <Body>
        <div>
          <h1>Create Assignment</h1>
          <div className={styles.assignmentForm}>
            <label htmlFor="assignmentName">Assignment Name:</label>
            <input
              type="text"
              id="assignmentName"
              value={assignmentName}
              onChange={(e) => setAssignmentName(e.target.value)}
            />
            <label htmlFor="dueDate">Due Date:</label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
            <label htmlFor="associatedClass">Associated Class:</label>
            <select
              id="associatedClass"
              value={associatedClass}
              onChange={(e) => setAssociatedClass(e.target.value)}
            >
              <option value="">Select Class</option>
              {/* Populate dropdown with classes */}
              <option value="CMPUT 101">CMPUT 101</option>
              <option value="CMPUT 102">CMPUT 102</option>
              {/* Add more options as needed */}
            </select>
            <div className={styles.rubric}>
              <h3>Rubric</h3>
              {rubricCategories.map((category, index) => (
                <div key={index} className={styles.category}>
                  <input
                    type="text"
                    placeholder="Category Name"
                    value={category.name}
                    onChange={(e) => handleCategoryChange(index, 'name', e.target.value)}
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="Max Marks"
                    value={category.maxMarks}
                    onChange={(e) => handleCategoryChange(index, 'maxMarks', parseInt(e.target.value))}
                  />
                  <input
                    type="number"
                    min="0"
                    max={category.maxMarks}
                    placeholder="Marks"
                    value={category.marks}
                    onChange={(e) => handleRubricValueChange(index, parseInt(e.target.value))}
                  />
                  <button onClick={() => handleRemoveCategory(index)}>Remove</button>
                </div>
              ))}
              <button onClick={handleAddCategory}>Add Category</button>
            </div>
          </div>
          <button onClick={handleCreateAssignment}>Create Assignment</button>
        </div>
      </Body>
    </Page>
  );
};

export default CreateAssignment;

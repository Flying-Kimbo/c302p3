'use client'

import React, { useState } from 'react';
import styles from './page.module.css';
import Page, { Header, Body } from "../../../../components/Page";

type rubricLevel = {
  id: number;
  description: string;
  value: number;
};

type rubricCategory = {
  id: number;
  name: string;
  maxMarks: number;
  levels: rubricLevel[];
};

const CreateAssignment = () => {
  const [assignmentName, setAssignmentName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [associatedClass, setAssociatedClass] = useState('');
  const [rubricCategories, setRubricCategories] = useState([{ id: 0, name: 'Category 1', maxMarks: 10, levels: [{ id: 0, description: "No Effort", value: 0 }, { id: 1, description: "Some Effort", value: 10 }] }] as rubricCategory[]);

  const handleAddCategory = () => {
    const nextId = rubricCategories.reduce((maxId, category) => (category.id > maxId) ? category.id : maxId, 0) + 1;
    setRubricCategories([...rubricCategories, { id: nextId, name: 'New Category', maxMarks: 10, levels: [{ id: 0, description: "No Effort", value: 0 }, { id: 1, description: "Some Effort", value: 10 }] }]);
  };

  const handleRemoveCategory = (id: number) => {
    const updatedCategories = rubricCategories.filter((category) => category.id !== id);
    setRubricCategories(updatedCategories);
  };

  const updateCategoryName = (id: number, value: string) => {
    const updatedCategories = [...rubricCategories];
    const targetCategory = updatedCategories.find((category) => category.id === id);
    if (targetCategory) {
      targetCategory.name = value;
    }
    setRubricCategories(updatedCategories);
  };

  const updateCategoryMaxMarks = (id: number, value: number) => {
    const updatedCategories = [...rubricCategories];
    const targetCategory = updatedCategories.find((category) => category.id === id);
    if (targetCategory) {
      targetCategory.maxMarks = value;
    }
    setRubricCategories(updatedCategories);
  };

  const removeCategoryLevel = (categoryId: number, levelId: number) => {
    const updatedCategories = [...rubricCategories];
    const targetCategory = updatedCategories.find((category) => category.id === categoryId);
    if (targetCategory) {
      targetCategory.levels = targetCategory.levels.filter((level) => level.id !== levelId);
    }
    setRubricCategories(updatedCategories);
  }

  const addCategoryLevel = (categoryId: number) => {
    const updatedCategories = [...rubricCategories];
    const targetCategory = updatedCategories.find((category) => category.id === categoryId);
    if (targetCategory) {
      const nextId = targetCategory.levels.reduce((maxId, level) => (level.id > maxId) ? level.id : maxId, 0) + 1;
      targetCategory.levels.push({ id: nextId, description: 'New Level', value: targetCategory.maxMarks });
    }
    setRubricCategories(updatedCategories);
  }

  const updateLevelDescription = (categoryId: number, levelId: number, value: string) => {
    const updatedCategories = [...rubricCategories];
    const targetCategory = updatedCategories.find((category) => category.id === categoryId);
    if (targetCategory) {
      const targetLevel = targetCategory.levels.find((level) => level.id === levelId);
      if (targetLevel) {
        targetLevel.description = value;
      }
    }
    setRubricCategories(updatedCategories);
  }

  const updateLevelValue = (categoryId: number, levelId: number, value: number) => {
    const updatedCategories = [...rubricCategories];
    const targetCategory = updatedCategories.find((category) => category.id === categoryId);
    if (targetCategory) {
      const targetLevel = targetCategory.levels.find((level) => level.id === levelId);
      if (targetLevel) {
        targetLevel.value = value;
      }
    }

    updatedCategories.sort((a, b) => a.maxMarks - b.maxMarks);
    setRubricCategories(updatedCategories);
  }



  const handleCreateAssignment = () => {
    // Handle creation of assignment functionality here
    console.log('Creating assignment...');
    location.href = "/instructor/assignments"
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
              className={styles.dueDate}
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
                <div key={index} className={[styles.category, "card"].join(" ")}>
                  <label>Title:</label>
                  <input
                    type="text"
                    placeholder="Category Name"
                    value={category.name}
                    className={styles.categoryName}
                    onChange={(e) => updateCategoryName(category.id, e.target.value)}
                  />
                  <label>Maximum Marks:</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="Max Marks"
                    value={category.maxMarks}
                    className={styles.categoryMaxMarks}
                    onChange={(e) => updateCategoryMaxMarks(category.id, parseInt(e.target.value))}
                  />
                  <div className={styles.levels}>
                    {category.levels.map((level, levelIndex) => (
                      <div key={levelIndex} className={[styles.level, "card"].join(" ")}>
                        <label className={styles.levelDescriptionLabel}>Description:</label>
                        <textarea
                          placeholder="Level Description"
                          className={styles.levelDescription}
                          value={level.description}
                          onChange={(e) => updateLevelDescription(category.id, level.id, e.target.value)}
                        />
                        <label  className={styles.levelValueLabel}>Grade:</label>
                        <input
                          type="number"
                          min="0"
                          max={category.maxMarks}
                          placeholder="Value"
                          value={level.value}
                          className={styles.levelValue}
                          onChange={(e) => updateLevelValue(category.id, level.id, parseInt(e.target.value))}
                        />
                        <button onClick={() => removeCategoryLevel(category.id, level.id)} className={styles.levelRemove}>Remove Level</button>
                      </div>
                    ))}
                    <button onClick={() => addCategoryLevel(category.id)}>Add Level</button>
                  </div>
                  <button onClick={() => handleRemoveCategory(category.id)} className={styles.categoryRemove}>Remove Category</button>
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

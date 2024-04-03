'use client'

import React, { useState } from 'react';
import styles from './page.module.css';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import Page, { Body, Header } from '@/components/Page';

const Submission = () => {
  const searchParams = useSearchParams();
  const submitted = searchParams.get('submitted');

  // Dummy assignment data
  const assignment = {
    name: 'Assignment 1',
    dueDate: '2024-03-20',
    className: 'Mathematics',
    rubricUrl: 'https://example.com/rubric'
  };

  // Variables
  const [assignmentUploaded, setAssignmentUploaded] = useState((submitted === "true"));

  const handleFileUpload = (event) => {
    // Handle file drop functionality here (not implemented yet)
    event.preventDefault();
    console.log('File uploaded');
    setAssignmentUploaded(true);
  };

  const handleSubmit = () => {
    // Handle submit functionality here (not implemented yet)
    console.log('Assignment submitted');
    location.href='/student/assignments?submitted=true'
  };

  const goBack = () => {
    // Handle go back functionality here (not implemented yet)
    console.log('Go back');
    location.href='/student/assignments'
  };

  return (
    <Page>
      <Header text="Submit Assignment" />
      <Body>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1>{assignment.name}</h1>
            <div className={styles.submissionInfo}>
              <div className={styles.infoContainer}>Due Date: {assignment.dueDate}</div>
              <div className={styles.infoContainer}>Class Name: {assignment.className}</div>
              <button onClick={() => window.open(assignment.rubricUrl, '_blank')}>View Rubric</button>
            </div>
          </div>
          { assignmentUploaded ? (
            <>
              <div className={styles.submittedAssignment}>
                <Image
                  src="/assignmentP1.png"
                  alt="assignment page 1"
                  width={600}
                  height={800}
                />
                <Image
                  src="/assignmentP2.png"
                  alt="assignment page 2"
                  width={600}
                  height={800}
                />
                <div className={styles.reupload}>
                    <p>Upload a different file?</p>
                    <input type="file" id="assignment" name="assignment" onChange={handleFileUpload} />
                </div>
              </div>
            </>
          ) : (
            <div className={styles.dropArea} onDrop={handleFileUpload} onDragOver={(e) => e.preventDefault()}>
              <div>
                <p>Drag and drop your file here</p>
                <input type="file" id="assignment" name="assignment" onChange={handleFileUpload} />
              </div>
            </div>
          )}
          <div className={styles.buttons}>
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={goBack}>Back</button>
          </div>
        </div>
      </Body>
    </Page>
  );
};

export default Submission;
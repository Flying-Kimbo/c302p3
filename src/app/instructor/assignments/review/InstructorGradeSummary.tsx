import { useRef, useState } from "react";
import styles from "./page.module.css";

export default function InstructorGradeSummary() {
  // Assuming rubric data and student marks data are available
  const rubricData = [
    { category: "Grammar", max_marks: 10 },
    { category: "Content", max_marks: 20 }
    // Add more rubric categories as needed
  ];

  const studentMarksData = useRef([
    { category: "Grammar", student_marks: 8 },
    { category: "Content", student_marks: 15 }
    // Add student marks for each category
  ]);

  function refreshMarks() {
    setTotalStudentMarks(Array.from(document.querySelectorAll(`input[data-rubric-grading-input]`))
      .map(element => parseInt((element as HTMLInputElement).value))
      .reduce((a, b) => a + b, 0));
  }

  // Calculate total marks and total student marks
  const totalMarks = rubricData.reduce((total, { max_marks }) => total + max_marks, 0);
  const [totalStudentMarks, setTotalStudentMarks] = useState(studentMarksData.current.reduce((total, { student_marks }) => total + student_marks, 0));
  const percentageMark = ((totalStudentMarks / totalMarks) * 100).toFixed(1);

  // Function to show rubric
  const handleShowRubric = () => {
    // Logic to show rubric
    console.log("Show rubric");
  };

  const handleCompleteMarking = () => {
    // Logic to complete marking
    console.log("Complete marking");
    location.href = "/instructor/assignments";
  }

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
            const studentMarks = studentMarksData.current[index]!.student_marks || 0;
            return (
              <tr key={category}>
                <td>{category}</td>
                <td>
                  <input type="number" max={max_marks} min={0} value={studentMarks} onChange={e => {
                    studentMarksData.current[index].student_marks = parseInt(e.target.value);
                    refreshMarks();
                  }} data-rubric-grading-input />
                  /{max_marks}
                </td>
              </tr>
            );
          })}
          <tr className={styles['grade-summary-total']}>
            <td>Total</td>
            <td>{`${totalStudentMarks}/${totalMarks} = ${percentageMark}%`}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={handleCompleteMarking}>
        Complete Marking
      </button>
    </div>
  );
};
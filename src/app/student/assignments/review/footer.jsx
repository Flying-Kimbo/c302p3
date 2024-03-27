// Footer.jsx
import styles from './footer.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.legend}>
        <h3>Legend</h3>
        <ul>
          <li>
            <span className={`${styles.legendSquare} ${styles.aiComment}`}></span> AI-generated comment
          </li>
          <li>
            <span className={`${styles.legendSquare} ${styles.instructorComment}`}></span> Instructor comment
          </li>
          <li>
            <span className={`${styles.legendSquare} ${styles.plagiarismHighlight}`}></span> Plagiarism detection
          </li>
          <li>
            <span className={`${styles.legendSquare} ${styles.similarityHighlight}`}></span> Similarities between students
          </li>
        </ul>
      </div>
    </footer>
  );
};
export default Footer;

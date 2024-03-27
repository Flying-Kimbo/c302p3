// Footer.jsx
import styles from './footer.css';

const Footer = () => {
  return (
    <footer className={'footer'}>
      <div className={'legend'}>
        <h3>Legend</h3>
        <ul>
          <li>
            <span className={'aiComment'}></span> AI-generated comment
          </li>
          <li>
            <span className={`instructorComment`}></span> Instructor comment
          </li>
          <li>
            <span className={'plagiarismHighlight'}></span> Plagiarism detection
          </li>
          <li>
            <span className={'similarityHighlight'}></span> Similarities between students
          </li>
        </ul>
      </div>
    </footer>
  );
};
export default Footer;

'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './page.module.css';
import * as yaml from 'js-yaml'; // Import the js-yaml library
import Page, { Header, Body } from "../../../../components/Page";
import InstructorGradeSummary from './InstructorGradeSummary';

const yamlContent = `
    rubric:
      - category: Grammar
        max_marks: 10
      - category: Content
        max_marks: 20

    comments:
      - position:
          start: 1
          end: 5
        content: "You need to work on your grammar in this paragraph."
        id: 1
      - position:
          start: 7
          end: 9
        content: "Great job on including relevant content here!"
        id: 2
      - position:
          start: 11
          end: 15
        content: "Testing!"
        id: 3

    general:
      - comment: Lorem Ipsum dolet sit amur
      - comment: This is yet another comment, I don't quite know what I am commenting on
      - comment: YAAAAAA
  `;



const InstructorReviewPage = () => {
  // Parse YAML content
  const [data, setData] = useState<{
    rubric: { category: string, max_marks: number }[],
    comments: { position: { start: number, end: number }, content: string, id: number }[],
    general: { comment: string }[]
  }>(yaml.load(yamlContent) as any);
  const [resizeTrigger, setResizeTrigger] = useState(false);

  // Extract rubric and comments from data object
  const { rubric, comments, general } = data;

  // Text content of the assignment
  let assignmentContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  assignmentContent = assignmentContent.repeat(100); // uncomment to extend lorem ipsum to test scrolling

  const commentDivs = comments.sort((a, b) => a.position.end - b.position.end).map(({ content, id }: { content: string, id: number }, index: number) => {
    return (
      <div
        key={index}
        data-comment-id={id}
        className={styles['comment']}>
        <b>Comment</b> <br />
        <hr /><br />
        <span contentEditable={true} onInput={() => {
          // Yes. this is a copy of the onResize function below.
          // I have this copy.
          let cannotBeLessThan = 0; // overlap check
          for (let i = 0; i < commentDivs.length; i++) {
            const commentReactDiv = commentDivs[i] as React.ReactElement;
            const id = commentReactDiv.props["data-comment-id"];

            // Position comment to as close to its text as possible
            const highlightedText = document.querySelector(`.${styles['highlighted-text']}[data-comment-id="${id}"]`) as HTMLSpanElement;
            const commentDiv = document.querySelector(`.${styles['comment']}[data-comment-id="${id}"]`) as HTMLDivElement;
            commentDiv.style.position = 'absolute';

            let positionedTop = highlightedText.offsetTop - 70; // minus 70 bc the header is 70px tall
            if (i > 0) {
              // Check if we are overlapping with predecessor
              if (cannotBeLessThan > positionedTop) {
                positionedTop = cannotBeLessThan;
              }
            }
            commentDiv.style.top = `${positionedTop}px`;
            cannotBeLessThan = positionedTop + commentDiv.offsetHeight + 10;  // add 10 for a tiny gap.
          }
        }}>{content}</span>
      </div>
    );
  });

  function onCommentClick(event: React.MouseEvent<HTMLSpanElement>) {
    const target = event.target as HTMLElement;
    const id = target.getAttribute("data-comment-id");

    document.querySelectorAll(`.${styles['comment']}`).forEach(commentDiv => commentDiv.classList.remove(styles.active));
    const commentDiv = document.querySelector(`.${styles['comment']}[data-comment-id="${id}"]`);
    commentDiv!.classList.add(styles.active);
  }

  useEffect(() => {
    function onResize() {
      let cannotBeLessThan = 0; // overlap check
      for (let i = 0; i < commentDivs.length; i++) {
        const commentReactDiv = commentDivs[i] as React.ReactElement;
        const id = commentReactDiv.props["data-comment-id"];

        // Position comment to as close to its text as possible
        const highlightedText = document.querySelector(`.${styles['highlighted-text']}[data-comment-id="${id}"]`) as HTMLSpanElement;
        const commentDiv = document.querySelector(`.${styles['comment']}[data-comment-id="${id}"]`) as HTMLDivElement;
        commentDiv.style.position = 'absolute';

        let positionedTop = highlightedText.offsetTop - 70; // minus 70 bc the header is 70px tall
        if (i > 0) {
          // Check if we are overlapping with predecessor
          if (cannotBeLessThan > positionedTop) {
            positionedTop = cannotBeLessThan;
          }
        }
        commentDiv.style.top = `${positionedTop}px`;
        cannotBeLessThan = positionedTop + commentDiv.offsetHeight + 10;  // add 10 for a tiny gap.
      }
    }

    if (resizeTrigger) {
      setResizeTrigger(false);
      onResize();
    }
  }, [resizeTrigger, commentDivs]);

  useEffect(() => {
    // First, just place the comments wherever we can.
    // commentDivs is sorted from the top comment to the bottom comment by position

    function trigger() {
      setResizeTrigger(true);
    }
    trigger();

    document.addEventListener("resize", trigger);
    return () => document.removeEventListener("resize", trigger);
  }, [resizeTrigger]);

  useEffect(() => {
    function onMouseUp(event: MouseEvent) {
      const selection = window.getSelection();

      const targetElementParent = (event.target as HTMLSpanElement).parentElement;
      if (selection && targetElementParent!.classList.contains(styles['ipsum-content'])) {
        const range = selection!.getRangeAt(0);

        if (range.startOffset === range.endOffset) {
          return;
        }
        if (range.startContainer !== range.endContainer || (event.target as HTMLSpanElement).classList.contains(styles['highlighted-text'])) {
          return;
        }

        const sortedComments = data.comments.sort((a, b) => a.position.end - b.position.end);
        let commentsBeforeOurNode = 0;
        for (const element of targetElementParent!.children) {
          if (element.classList.contains(styles['highlighted-text'])) {
            commentsBeforeOurNode++;
          } else if (element === event.target) {
            break;
          }
        }

        let offset = commentsBeforeOurNode === 0 ? 0 : sortedComments[commentsBeforeOurNode - 1].position.end;
        const start = range.startOffset + offset + 1;
        const end = range.endOffset + offset;

        data.comments.push({
          position: { start, end },
          content: "...",
          id: data.comments.length + 1
        });
        setData({
          rubric: data.rubric,
          comments: data.comments,
          general: data.general
        });

      }
    }

    document.addEventListener("mouseup", onMouseUp);

    return () => document.removeEventListener("mouseup", onMouseUp);
  }, [commentDivs, data]);

  // Render comments with highlighted text
  return (
    <Page>
      <Header>
        <h1>Review</h1>
        {/* <div>
          <Form>
            <Form.Check type="switch" label="AI Review" />
          </Form>
        </div> */}
      </Header>
      <Body>
        <div className={styles['main-layout']}>
          <div className={styles['review-page']}>
            <div className={styles['left-column']}>
              <h2>English</h2>
              <div className={`${styles['assignment-details']}`}> {/* Apply left-column-content style here */}
                <h3>Rubric Details</h3>
              </div>
              <div className={`${styles['assignment-details-widget']}`}>
                {InstructorGradeSummary()}
              </div>
            </div>
            <div className={styles['assignment-and-comments']}>
              <div className={styles['center-column']}>
                <div className={styles['assignment-header']}>
                  <h1>Assignment Name</h1>
                </div>
                <div className={styles['ipsum-content']}>
                  <h2>Assignment Content</h2>
                  {/* Split the assignment content and wrap sections corresponding to comments with spans */}
                  {comments.map((comment: { id: number, content: string, position: { start: number, end: number } }, index: number) => {
                    const { start, end } = comment.position;
                    const beforeComment = index === 0 ? assignmentContent.slice(0, start) : "";
                    const commentText = assignmentContent.slice(start, end + 1);

                    const afterCommentEndPos = index === comments.length - 1 ? assignmentContent.length : comments[index + 1].position.start;
                    const afterComment = assignmentContent.slice(end + 1, afterCommentEndPos);
                    return (
                      <React.Fragment key={index}>
                        <span>{beforeComment}</span>
                        <span
                          className={styles['highlighted-text']}
                          data-comment-id={comment.id}
                          onClick={onCommentClick}
                        >
                          {commentText}
                        </span>
                        <span>{afterComment}</span>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
              <div className={styles['right-column']}>
                {commentDivs}
              </div>
            </div>
          </div>
        </div>
      </Body>
    </Page>
  );
};

export default InstructorReviewPage;
// GraphPage.tsx
import React from 'react';
import styles from './page.module.css';

const GraphPage = () => {
  const data = [
    { factor: "Factor 1", significance: 0.8, tooltip: "Explanation of Factor 1" },
    { factor: "Factor 2", significance: 0.6, tooltip: "Explanation of Factor 2" },
    { factor: "Factor 3", significance: 0.9, tooltip: "Explanation of Factor 3" },
    // Add more data as needed
  ];

  return (
    <div className={styles.graphPage}>
      <h1>Graph Page</h1>
      <div className={styles.graphContainer}>
        <h2>Significance vs. Factors</h2>
        <div className={styles.barChart}>
          {data.map((item, index) => (
            <div key={index} className={styles.bar} style={{ height: `${item.significance * 100}%` }} data-tooltip={item.tooltip}>
              {item.factor}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GraphPage;

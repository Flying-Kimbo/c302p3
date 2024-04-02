'use client'

import React from 'react';
import styles from './page.module.css';
import Chart from "chart.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register ChartJS components using ChartJS.register
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip
);
// Assuming you have an array of AI models, each with a name and an array of factors
const aiModels = [
  {
    name: "AI 1 - Proofreader.ai",
    description: "This AI model is designed to detect and correct grammatical, spelling, and punctuation errors. It evaluates its criteria based on the number and severity of errors.",
    criteriaEvaluation: "The AI assigns a higher significance score to texts with more errors, as they are more likely to be indicative of academic dishonesty.",
    factors: [
      { name: "Published Articles", significance: 0.8 },
      { name: "Other Students", significance: 0.6 },
      { name: "Class Materials", significance: 0.9 },
      { name: "Creativity", significance: 0.2 },
    ],
  },
  {
    name: "AI 2 - Plagiarism Detector",
    description: "This AI model is designed to detect instances of plagiarism by comparing the text against a database of published articles, other students' work, and class materials. It evaluates its criteria based on the number and length of matching phrases.",
    criteriaEvaluation: "The AI assigns a higher significance score to texts with more and longer matching phrases, as they are more likely to be indicative of plagiarism.",
    factors: [
      { name: "Published Articles", significance: 0.2 },
      { name: "Other Students", significance: 0.4 },
      { name: "Class Materials", significance: 0.6 },
      { name: "Creativity", significance: 0.8 },
    ],
  },
  {
    name: "AI 3 - Ghostwriting Detector",
    description: "This AI model is designed to detect instances of ghostwriting by analyzing the text for inconsistencies in style, tone, and vocabulary. It evaluates its criteria based on the number and severity of inconsistencies.",
    criteriaEvaluation: "The AI assigns a higher significance score to texts with more and more severe inconsistencies, as they are more likely to be indicative of ghostwriting.",
    factors: [
      { name: "Published Articles", significance: 0.5 },
      { name: "Other Students", significance: 0.3 },
      { name: "Class Materials", significance: 0.7 },
      { name: "Creativity", significance: 0.9 },
    ],
  },
  {
    name: "AI 4 - Collusion Detector",
    description: "This AI model is designed to detect instances of collusion by comparing the text against other students' work and class materials. It evaluates its criteria based on the number and length of matching phrases and the similarity of ideas.",
    criteriaEvaluation: "The AI assigns a higher significance score to texts with more and longer matching phrases and more similar ideas, as they are more likely to be indicative of collusion.",
    factors: [
      { name: "Published Articles", significance: 0.7 },
      { name: "Other Students", significance: 0.9 },
      { name: "Class Materials", significance: 0.5 },
      { name: "Creativity", significance: 0.3 },
    ],
  },
  {
    name: "AI 5 - Fabrication Detector",
    description: "This AI model is designed to detect instances of fabrication by analyzing the text for inconsistencies in facts, statistics, and references. It evaluates its criteria based on the number and severity of inconsistencies.",
    criteriaEvaluation: "The AI assigns a higher significance score to texts with more and more severe inconsistencies, as they are more likely to be indicative of fabrication.",
    factors: [
      { name: "Published Articles", significance: 0.3 },
      { name: "Other Students", significance: 0.5 },
      { name: "Class Materials", significance: 0.8 },
      { name: "Creativity", significance: 0.7 },
    ],
  },
  {
    name: "AI 6 - Falsification Detector",
    description: "This AI model is designed to detect instances of falsification by analyzing the text for inconsistencies in data, results, and conclusions. It evaluates its criteria based on the number and severity of inconsistencies." ,
    criteriaEvaluation: "The AI assigns a higher significance score to texts with more and more severe inconsistencies, as they are more likely to be indicative of falsification.",
    factors: [
      { name: "Published Articles", significance: 0.9 },
      { name: "Other Students", significance: 0.2 },
      { name: "Class Materials", significance: 0.4 },
      { name: "Creativity", significance: 0.6 },
    ],
  },
];
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Extract the labels (factor names) and datasets (factor significance for each model)
const labels = [...new Set(aiModels.flatMap((model) => model.factors.map((factor) => factor.name)))];

const datasets = aiModels.map((model) => ({
  label: model.name,
  backgroundColor: getRandomColor(), // replace with your color generation logic
  borderColor: getRandomColor(), // replace with your color generation logic
  data: model.factors.map((factor) => factor.significance),
}));

const dataset = {
  labels: labels,
  datasets: datasets,
};

const config = {
  type: 'bar',
  data: dataset,
  options: {
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'AI Detection of Academic Dishonesty Factors'
      }
    }
  },
};
const AiModelSection = ({ model, id }) => (
  <div style={{ color: model.color }} id={id}>
    <h3>{model.name}</h3>
    <p>{model.description}</p>
    <p>{model.criteriaEvaluation}</p>
  </div>
);
function GraphPage({ data }) {
  const handleBarClick = () => {
    const index = Math.floor(Math.random() * 7);
    const descriptionId = `description-${index}`;
    const descriptionElement = document.getElementById(descriptionId);
    if (descriptionElement) {
      descriptionElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
  <div className={styles.graphPage}>
    <h1>Graph Page</h1>
    <div className={styles.graphContainer}>
      <h2>AI Detected Factors affecting Assignment Marking</h2>
      <Bar className={styles['graph-container']} data={dataset} options={config} onClick={handleBarClick} />
    </div>
    <div>
    <h2>Graph Explanation</h2>
    <div>The graph shows the significance scores assigned by six different AI models to four factors that can affect assignment marking: Published Articles, Other Students Work, Class Materials, and Creativity. Each bar represents a factor, and each segment of the bar represents the significance score assigned by an AI model to that factor. The color of each segment corresponds to the AI model that assigned the score.</div>
    <div>Each AI model analyzes the text based on different criteria and assigns significance scores accordingly. For example, the Proofreader.ai model focuses on grammatical, spelling, and punctuation errors, while the Plagiarism Detector model compares the text against a database of published articles, other students' work, and class materials to detect instances of plagiarism. The Ghostwriting Detector model analyzes the text for inconsistencies in style, tone, and vocabulary to detect instances of ghostwriting, while the Collusion Detector model compares the text against other students' work and class materials to detect instances of collusion. The Fabrication Detector model analyzes the text for inconsistencies in facts, statistics, and references to detect instances of fabrication, while the Falsification Detector model analyzes the text for inconsistencies in data, results, and conclusions to detect instances of falsification.</div>
    <div>The Creativity factor is a measure of the originality and uniqueness of the text. It is evaluated based on the use of language, the expression of ideas, and the structure of the text. A higher score indicates that the text is more creative and original, while a lower score indicates that the text is more formulaic and unoriginal.</div>
    </div>
    <div className={styles.aiModelContainer}>
      {aiModels.map((model, index) => (
        <AiModelSection key={model.name} model={model} id={`description-${index}`} />
      ))}
    </div>
  </div>
);
}
export default GraphPage;

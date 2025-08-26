import React from 'react';
import styles from '../../pages/Formulario.module.css';

interface ProgressBarProps {
  progresso: number;
  blocoAtivo: number;
  totalBlocos: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progresso, blocoAtivo, totalBlocos }) => (
  <div className={styles.progressContainer}>
    <div className={styles.progressBar}>
      <div 
        className={styles.progressFill} 
        style={{ width: `${progresso}%` }}
      ></div>
    </div>
    <div className={styles.progressText}>
      {blocoAtivo + 1} de {totalBlocos} blocos
    </div>
  </div>
);

export default ProgressBar;
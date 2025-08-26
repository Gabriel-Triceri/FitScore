import React from 'react';
import styles from '../../pages/Formulario.module.css';

interface ResultsSectionProps {
  fitScore: number;
  classificacao: string;
  submitting: boolean;
  notifying: boolean;
  handleReset: () => void;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ 
  fitScore, 
  classificacao, 
  submitting, 
  notifying, 
  handleReset 
}) => (
  <div className={`${styles.formSection} ${styles.resultsSection}`}>
    <div className={styles.resultsContainer}>
      <div className={styles.resultsLeft}>
        <div className={styles.resultTitle}>Resultado do FitScore</div>
        <div className={styles.resultScore}>{fitScore}</div>
        <div className={`${styles.resultChip} ${styles[`resultChip${classificacao.replace(/\s+/g, '')}`]}`}>
          {classificacao}
        </div>
      </div>
      
      <div className={styles.resultsRight}>
        <div className={styles.buttonsContainer}>
          <button 
            type="button" 
            className={`${styles.button} ${styles.buttonSecondary}`} 
            onClick={handleReset} 
            disabled={submitting || notifying}
          >
            Limpar
          </button>
          <button 
            type="submit" 
            className={`${styles.button} ${styles.buttonPrimary}`} 
            disabled={submitting || notifying}
          >
            {submitting ? 'Enviando...' : notifying ? 'Enviando notificação...' : 'Enviar'}
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default ResultsSection;
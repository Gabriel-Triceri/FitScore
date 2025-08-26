import React from 'react';
import styles from '../../pages/Formulario.module.css';

interface QuestionBlockProps {
  bloco: any;
  blocoIndex: number;
  respostas: number[];
  updateResposta: (blocoIndex: number, perguntaIndex: number, value: number) => void;
  getIndiceGlobal: (blocoIndex: number, perguntaIndex: number) => number;
}

const QuestionBlock: React.FC<QuestionBlockProps> = ({ 
  bloco, 
  blocoIndex, 
  respostas, 
  updateResposta, 
  getIndiceGlobal 
}) => (
  <div className={styles.formSection}>
    <div className={styles.sectionTitle}>
      {bloco.titulo}
    </div>
    <div className={styles.sectionDescription}>
      {bloco.descricao}
    </div>

    {bloco.perguntas.map((pergunta: string, perguntaIndex: number) => {
      const indiceGlobal = getIndiceGlobal(blocoIndex, perguntaIndex);
      return (
        <div key={`${blocoIndex}-${perguntaIndex}`} className={styles.question}>
          <div className={styles.questionHeader}>
            <div className={styles.questionTitle}>{pergunta}</div>
            <div className={styles.questionRequired}>*</div>
          </div>
          
          <div className={styles.sliderContainer}>
            <input
              type="range"
              min={0}
              max={10}
              value={respostas[indiceGlobal]}
              onChange={e => updateResposta(blocoIndex, perguntaIndex, Number(e.target.value))}
              className={styles.slider}
              aria-label={pergunta}
            />
            <div className={styles.sliderValue}>{respostas[indiceGlobal]}</div>
          </div>
          
          <div className={styles.sliderLabels}>
            <span>0 (Discordo totalmente)</span>
            <span>10 (Concordo totalmente)</span>
          </div>
        </div>
      );
    })}
  </div>
);

export default QuestionBlock;
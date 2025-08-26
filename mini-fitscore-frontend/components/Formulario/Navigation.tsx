import React from 'react';
import styles from '../../pages/Formulario.module.css';

interface NavigationProps {
  blocoAtivo: number;
  setBlocoAtivo: (index: number) => void;
  totalBlocos: number;
  perguntasPorBloco: any[];
}

const Navigation: React.FC<NavigationProps> = ({ 
  blocoAtivo, 
  setBlocoAtivo, 
  totalBlocos, 
  perguntasPorBloco 
}) => (
  <div className={styles.blocoNavegacao}>
    <button
      type="button"
      className={styles.navButton}
      disabled={blocoAtivo === 0}
      onClick={() => setBlocoAtivo(blocoAtivo - 1)}
    >
      Anterior
    </button>
    <span className={styles.blocoIndicador}>
      Bloco {blocoAtivo + 1}: {perguntasPorBloco[blocoAtivo].titulo}
    </span>
    <button
      type="button"
      className={styles.navButton}
      disabled={blocoAtivo === totalBlocos - 1}
      onClick={() => setBlocoAtivo(blocoAtivo + 1)}
    >
      Próximo
    </button>
  </div>
);

export default Navigation;
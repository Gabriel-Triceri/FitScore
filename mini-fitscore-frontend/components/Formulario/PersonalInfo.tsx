import React from 'react';
import styles from '../../pages/Formulario.module.css';

interface PersonalInfoProps {
  nome: string;
  setNome: (nome: string) => void;
  email: string;
  setEmail: (email: string) => void;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ nome, setNome, email, setEmail }) => (
  <div className={styles.formSection}>
    <div className={styles.sectionTitle}>Informações Pessoais</div>
    
    <div className={styles.field}>
      <div className={styles.fieldLabel}>
        <span>Nome</span>
        <span className={styles.required}>*</span>
      </div>
      <input
        type="text"
        value={nome}
        onChange={e => setNome(e.target.value)}
        required
        className={styles.textInput}
        placeholder="Seu nome completo"
      />
    </div>

    <div className={styles.field}>
      <div className={styles.fieldLabel}>
        <span>Email</span>
        <span className={styles.required}>*</span>
      </div>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className={styles.textInput}
        placeholder="seu@email.com"
      />
    </div>
  </div>
);

export default PersonalInfo;
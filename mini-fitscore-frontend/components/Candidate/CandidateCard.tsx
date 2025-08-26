import React from 'react'
import styles from './CandidateCard.module.css' 

type Candidate = {
  id: number
  nome: string
  email: string
  fitScore: number
  classificacao: string
}

export default function CandidateCard({ c }: { c: Candidate }) {
  const getBadgeClass = () => {
    const baseClass = styles.classificationBadge;
    const classificationClass = styles[`classification${c.classificacao.charAt(0).toUpperCase() + c.classificacao.slice(1).toLowerCase()}`];
    return `${baseClass} ${classificationClass}`;
  };

  return (
    <div className={styles.candidateCard}>
      <div className={styles.cardHeader}>
        <div className={styles.candidateName}>{c.nome}</div>
        <div className={getBadgeClass()}>{c.classificacao}</div>
      </div>
      <div className={styles.candidateEmail}>{c.email}</div>
      <div className={styles.cardFooter}>
        <div className={styles.scoreDisplay}>FitScore: <strong>{c.fitScore}</strong></div>
        <button className={styles.viewButton}>Ver detalhes</button>
      </div>
    </div>
  )
}
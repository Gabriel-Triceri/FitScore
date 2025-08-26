import React from 'react'
import styles from './CandidateRow.module.css' 

type Candidate = {
  id: number;
  nome: string;
  email: string;
  fitScore: number;
  classificacao: string;
}

export default function CandidateRow({c}: {c: Candidate}) {
  const getBadgeClass = () => {
    const baseClass = styles.classificationBadge;
    const classificationClass = styles[`classification${c.classificacao.charAt(0).toUpperCase() + c.classificacao.slice(1).toLowerCase()}`];
    return `${baseClass} ${classificationClass}`;
  };

  return (
    <tr className={styles.tableRow}>
      <td className={styles.tableCell}>{c.nome}</td>
      <td className={styles.tableCell}>{c.email}</td>
      <td className={styles.tableCell}>{c.fitScore}</td>
      <td className={styles.tableCell}>
        <span className={getBadgeClass()}>{c.classificacao}</span>
      </td>
    </tr>
  )
}
import React from 'react'
import CandidateRow from '../Candidate/CandidateRow'
import CandidateCard from '../Candidate/CandidateCard'
import styles from './Results.module.css' 

type Candidate = {
  id: number
  nome: string
  email: string
  fitScore: number
  classificacao: string
}

type Props = {
  data: Candidate[] | null
  loading: boolean
}

export default function Results({ data, loading }: Props) {
  if (loading) {
    return <div className={styles.loadingState}>Carregando candidatos...</div>
  }

  if (!data || data.length === 0) {
    return <div className={styles.emptyState}>Nenhum candidato encontrado.</div>
  }

  return (
    <div className={styles.resultsContainer}>
      <div className={styles.tableContainer}>
        <table className={styles.candidatesTable}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>FitScore</th>
              <th>Classificação</th>
            </tr>
          </thead>
          <tbody>
            {data.map(d => <CandidateRow key={d.id} c={d} />)}
          </tbody>
        </table>
      </div>

      <div className={styles.cardsContainer}>
        {data.map(d => <CandidateCard key={d.id} c={d} />)}
      </div>
    </div>
  )
}
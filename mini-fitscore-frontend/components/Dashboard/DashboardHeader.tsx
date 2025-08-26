import styles from './Dashboard.module.css'

export default function DashboardHeader() {
  return (
    <div className={styles['dashboard-header']}>
      <div className={styles['dashboard-title-container']}>
        <h1 className={styles['dashboard-title']}>Painel de Candidatos</h1>
        <p className={styles['dashboard-description']}>
          Visualize, filtre e gerencie candidatos — layout simples e responsivo.
        </p>
      </div>
    </div>
  )
}
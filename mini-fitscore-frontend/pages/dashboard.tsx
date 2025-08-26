import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import DashboardHeader from '../components/Dashboard/DashboardHeader'
import DashboardControls from '../components/Dashboard/DashboardControls'
import Results from '../components/Dashboard/Results'
import styles from '../components/Dashboard/Dashboard.module.css'

type Candidate = {
  id: number
  nome: string
  email: string
  fitScore: number
  classificacao: string
}

const baseUrl = 'http://localhost:8080'
const classifications = ['All', 'ALTO', 'APROVADO', 'QUESTIONAVEL', 'BAIXO']

export default function DashboardPage(): JSX.Element {
  const [data, setData] = useState<Candidate[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState('All')
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)

  async function load() {
    setLoading(true)
    setError(null)
    try {
      const qParts: string[] = []
      if (filter !== 'All') qParts.push(`classificacao=${encodeURIComponent(filter)}`)
      const q = qParts.length > 0 ? `?${qParts.join('&')}` : ''

      const res = await fetch(baseUrl + '/api/candidatos' + q, {
        credentials: 'include'
      })

      if (!res.ok) {
        let msg = 'Erro ao carregar'
        try {
          const errBody = await res.json()
          msg = errBody?.error || msg
        } catch {}
        throw new Error(msg)
      }

      const j = (await res.json()) as Candidate[] | null
      setData(Array.isArray(j) ? j : [])
      setLastUpdated(new Date().toLocaleString())
    } catch (ex: any) {
      setError(ex.message || 'Erro')
      setData([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [filter])

  return (
    <Layout>
      <div className={styles['dashboard-container']}>
        <DashboardHeader />

        <div className={styles['dashboard-content']}>
          <DashboardControls
            filter={filter}
            setFilter={setFilter}
            classifications={classifications}
            onRefresh={load}
            loading={loading}
            lastUpdated={lastUpdated}
            error={error}
          />

          <div className={styles['dashboard-results']}>
            <Results data={data} loading={loading} />
          </div>
        </div>
      </div>
    </Layout>
  )
}
import React from 'react'
import Link from 'next/link'
import styles from './Layout.module.css'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <h1 className={styles.title}>Mini FitScore LEGAL</h1>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <span className={styles.separator}>|</span>
          <Link href="/formulario" className={styles.navLink}>Formulário</Link>
          <span className={styles.separator}>|</span>
          <Link href="/dashboard" className={styles.navLink}>Dashboard</Link>
        </nav>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        {/* Conteúdo do footer, se necessário */}
      </footer>
    </div>
  )
}
import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import { calculateFitScore, classify } from '../utils/fit';
import ProgressBar from '../components/Formulario/ProgressBar';
import PersonalInfo from '../components/Formulario/PersonalInfo';
import QuestionBlock from '../components/Formulario/QuestionBlock';
import Navigation from '../components/Formulario/Navigation';
import NotificationSettings from '../components/Formulario/NotificationSettings';
import ResultsSection from '../components/Formulario/ResultsSection';
import StatusMessage from '../components/Formulario/StatusMessage';
import { useFormSubmission } from '../components/hocks/useFormSubmission';
import styles from './Formulario.module.css';

export const perguntasPorBloco = [
  {
    titulo: "Desempenho",
    descricao: "Avalie a experiência, entregas e habilidades do candidato",
    perguntas: [
      "Experiência na área: como você avalia a experiência do candidato?",
      "Habilidades técnicas: o candidato possui as habilidades necessárias?",
      "Qualidade das entregas: como avalia a qualidade do trabalho entregue?",
      "Capacidade de aprendizado: o candidato aprende rápido e se adapta?"
    ]
  },
  {
    titulo: "Energia",
    descricao: "Avalie a disponibilidade, respeito a prazos e trabalho sob pressão",
    perguntas: [
      "Disponibilidade: o candidato está disponível para os horários necessários?",
      "Respeito a prazos: o candidato entrega dentro dos prazos?",
      "Trabalho sob pressão: como o candidato lida com situações de stress?"
    ]
  },
  {
    titulo: "Cultura",
    descricao: "Avalie o alinhamento com valores, trabalho em equipe e comprometimento",
    perguntas: [
      "Alinhamento com valores: o candidato compartilha dos valores da empresa?",
      "Trabalho em equipe: o candidato colabora bem com outros?",
      "Comprometimento: o candidato demonstra comprometimento com os objetivos?"
    ]
  }
];

export default function Formulario() {
  const [blocoAtivo, setBlocoAtivo] = useState(0);
  const totalBlocos = perguntasPorBloco.length;
  const progresso = ((blocoAtivo + 1) / totalBlocos) * 100;

  const {
    nome,
    setNome,
    email,
    setEmail,
    respostas,
    setRespostas,
    submitting,
    notifying,
    result,
    error,
    notificarCandidato,
    setNotificarCandidato,
    mensagemPersonalizada,
    setMensagemPersonalizada,
    handleSubmit,
    handleReset,
    updateResposta,
    getIndiceGlobal
  } = useFormSubmission();

  const fitScore = calculateFitScore(respostas);
  const classificacao = classify(fitScore);

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>Formulário FitScore</h1>
            <p className={styles.description}>
              Responda as perguntas abaixo — o design foi inspirado no Google Forms
            </p>
          </div>
        </div>

        <div className={styles.content}>
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <ProgressBar progresso={progresso} blocoAtivo={blocoAtivo} totalBlocos={totalBlocos} />
            
            <PersonalInfo nome={nome} setNome={setNome} email={email} setEmail={setEmail} />
            
            <Navigation 
              blocoAtivo={blocoAtivo} 
              setBlocoAtivo={setBlocoAtivo} 
              totalBlocos={totalBlocos} 
              perguntasPorBloco={perguntasPorBloco} 
            />
            
            <QuestionBlock
              bloco={perguntasPorBloco[blocoAtivo]}
              blocoIndex={blocoAtivo}
              respostas={respostas}
              updateResposta={updateResposta}
              getIndiceGlobal={getIndiceGlobal}
            />
            
            <NotificationSettings
              notificarCandidato={notificarCandidato}
              setNotificarCandidato={setNotificarCandidato}
              mensagemPersonalizada={mensagemPersonalizada}
              setMensagemPersonalizada={setMensagemPersonalizada}
            />
            
            <ResultsSection
              fitScore={fitScore}
              classificacao={classificacao}
              submitting={submitting}
              notifying={notifying}
              handleReset={handleReset}
            />
            
            {error && (
              <StatusMessage type="error" message={error} />
            )}
            
            {result && (
              <StatusMessage 
                type="success" 
                message={`Enviado com sucesso! ID: ${result.id} — Classificação: ${result.classificacao}`}
                notifying={notifying}
                notificarCandidato={notificarCandidato}
              />
            )}
          </form>
        </div>
      </div>
    </Layout>
  );
}
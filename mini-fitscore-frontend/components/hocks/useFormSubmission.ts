import { useState } from 'react';
import { perguntasPorBloco } from '../../pages/formulario';

const baseUrl = 'http://localhost:8080';

export const useFormSubmission = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [respostas, setRespostas] = useState<number[]>(Array(10).fill(5));
  const [submitting, setSubmitting] = useState(false);
  const [notifying, setNotifying] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [notificarCandidato, setNotificarCandidato] = useState(true);
  const [mensagemPersonalizada, setMensagemPersonalizada] = useState('');

  function updateResposta(blocoIndex: number, perguntaIndex: number, value: number) {
    let indiceGlobal = 0;
    for (let i = 0; i < blocoIndex; i++) {
      indiceGlobal += perguntasPorBloco[i].perguntas.length;
    }
    indiceGlobal += perguntaIndex;
    
    const copy = [...respostas];
    copy[indiceGlobal] = value;
    setRespostas(copy);
  }

  function getIndiceGlobal(blocoIndex: number, perguntaIndex: number): number {
    let indiceGlobal = 0;
    for (let i = 0; i < blocoIndex; i++) {
      indiceGlobal += perguntasPorBloco[i].perguntas.length;
    }
    return indiceGlobal + perguntaIndex;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nome.trim() || !email.trim()) {
      setError('Nome e email são obrigatórios');
      return;
    }
    setError(null);
    setSubmitting(true);
    
    try {
      const payload = { 
        nome, 
        email, 
        respostas,
        notificarCandidato,
        mensagemPersonalizada: mensagemPersonalizada || undefined
      };
      
      const res = await fetch(baseUrl + '/api/candidatos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        let msg = 'Erro ao salvar';
        try {
          const body = await res.json();
          msg = body?.error || msg;
        } catch {
          // mantém msg padrão
        }
        throw new Error(msg);
      }

      const j = await res.json();
      setResult(j);
      
      if (notificarCandidato) {
        setNotifying(true);
        try {
          await fetch(baseUrl + '/api/notificar-candidato', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              candidatoId: j.id,
              candidatoEmail: email,
              candidatoNome: nome,
              fitScore: calculateFitScore(respostas),
              classificacao: classify(calculateFitScore(respostas)),
              mensagemPersonalizada: mensagemPersonalizada || undefined
            })
          });
        } catch (err) {
          console.error('Erro na notificação:', err);
        } finally {
          setNotifying(false);
        }
      }
    } catch (err: any) {
      setError(err.message || 'Erro desconhecido');
    } finally {
      setSubmitting(false);
    }
  }

  function handleReset() {
    setNome('');
    setEmail('');
    setRespostas(Array(10).fill(5));
    setResult(null);
    setError(null);
    setNotificarCandidato(true);
    setMensagemPersonalizada('');
  }

  return {
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
  };
};
export type Classification = 'Fit Altíssimo' | 'Fit Aprovado' | 'Fit Questionável' | 'Fora do Perfil';

export function calculateFitScore(answers: number[]): number {
  if (!answers || answers.length !== 10) return 0;
  const sum = answers.reduce((a, b) => a + b, 0);
  return Math.round((sum / (10 * 10)) * 100);
}

export function classify(score: number): Classification {
  if (score >= 80) return 'Fit Altíssimo';
  if (score >= 60) return 'Fit Aprovado';
  if (score >= 40) return 'Fit Questionável';
  return 'Fora do Perfil';
}

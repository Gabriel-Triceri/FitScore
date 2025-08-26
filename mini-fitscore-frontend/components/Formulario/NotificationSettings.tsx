// components/Formulario/NotificationSettings.tsx
import React from 'react';
import styles from '../../pages/Formulario.module.css';

interface NotificationSettingsProps {
  notificarCandidato: boolean;
  setNotificarCandidato: (value: boolean) => void;
  mensagemPersonalizada: string;
  setMensagemPersonalizada: (value: string) => void;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({ 
  notificarCandidato, 
  setNotificarCandidato, 
  mensagemPersonalizada, 
  setMensagemPersonalizada 
}) => (
  <div className={styles.formSection}>
    <div className={styles.sectionTitle}>Configurações de Notificação</div>
    
    <div className={styles.field}>
      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          checked={notificarCandidato}
          onChange={e => setNotificarCandidato(e.target.checked)}
          className={styles.checkboxInput}
        />
        <span>Notificar candidato com o resultado</span>
      </label>
    </div>

    {notificarCandidato && (
      <div className={styles.field}>
        <div className={styles.fieldLabel}>
          <span>Mensagem personalizada (opcional)</span>
        </div>
        <textarea
          value={mensagemPersonalizada}
          onChange={e => setMensagemPersonalizada(e.target.value)}
          className={styles.textareaInput}
          placeholder="Adicione uma mensagem personalizada para o candidato"
          rows={3}
        />
      </div>
    )}
  </div>
);

export default NotificationSettings;
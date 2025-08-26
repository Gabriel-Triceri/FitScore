import React from 'react';
import styles from '../../pages/Formulario.module.css';

interface StatusMessageProps {
  type: 'error' | 'success';
  message: string;
  notifying?: boolean;
  notificarCandidato?: boolean;
}

const StatusMessage: React.FC<StatusMessageProps> = ({ 
  type, 
  message, 
  notifying, 
  notificarCandidato 
}) => (
  <div className={`${styles.message} ${type === 'error' ? styles.errorMessage : styles.successMessage}`} 
       role={type === 'error' ? 'alert' : 'status'}>
    <div className={styles.messageIcon}>{type === 'error' ? '!' : '✓'}</div>
    <div className={styles.messageContent}>
      {message}
      {type === 'success' && notificarCandidato && notifying && (
        <div className={styles.notificationStatus}>
          Enviando notificação para o candidato...
        </div>
      )}
      {type === 'success' && notificarCandidato && !notifying && (
        <div className={styles.notificationStatus}>
          Notificação enviada para o candidato.
        </div>
      )}
    </div>
  </div>
);

export default StatusMessage;
import React from 'react';

import { IAlertMessage } from '../../hooks/alert';
import AlertMessage from './AlertMessage';

import { Container } from './styles';

interface IAlertContainerProps {
  alerts: IAlertMessage[];
}

const AlertContainer: React.FC<IAlertContainerProps> = ({ alerts }) => {
  return (
    <Container>
      {alerts.map(alert => (
        <AlertMessage key={alert.id} alert={alert} />
      ))}
    </Container>
  );
};

export default AlertContainer;

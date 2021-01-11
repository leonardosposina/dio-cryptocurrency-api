import React, { createContext, useCallback, useContext, useState } from 'react';
import { uuid } from 'uuidv4';

import AlertContainer from '../components/AlertContainer';

export interface IAlertMessage {
  id: string;
  type: 'warning' | 'danger';
  message: string;
}

interface IAlertContextData {
  addAlert(alert: Omit<IAlertMessage, 'id'>): void;
  removeAlert(id: string): void;
}

const AlertContext = createContext<IAlertContextData>({} as IAlertContextData);

function useAlert(): IAlertContextData {
  const context = useContext(AlertContext);

  if (!context) throw new Error('useAlert must be inside a AlertProvider');

  return context;
}

const AlertProvider: React.FC = ({ children }) => {
  const [alerts, setAlerts] = useState<IAlertMessage[]>([]);

  const addAlert = useCallback(
    ({ type, message }: Omit<IAlertMessage, 'id'>) => {
      const id = uuid();
      const alert = { id, type, message };
      setAlerts([...alerts, alert]);
    },
    [alerts],
  );

  const removeAlert = useCallback((id: string) => {
    setAlerts(state => state.filter(alert => alert.id !== id));
  }, []);

  return (
    <AlertContext.Provider value={{ addAlert, removeAlert }}>
      {children}
      <AlertContainer alerts={alerts} />
    </AlertContext.Provider>
  );
};

export { useAlert, AlertProvider };

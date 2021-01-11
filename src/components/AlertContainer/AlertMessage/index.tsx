import React from 'react';

import { Alert } from 'react-bootstrap';
import { BiCommentError } from 'react-icons/bi';

import { useAlert, IAlertMessage } from '../../../hooks/alert';

interface IAlertMessageProps {
  alert: IAlertMessage;
}

const AlertMessage: React.FC<IAlertMessageProps> = ({ alert }) => {
  const { id, type, message } = alert;
  const { removeAlert } = useAlert();

  return (
    <>
      <Alert variant={type} onClose={() => removeAlert(id)} dismissible>
        <BiCommentError size="24" />
        &nbsp;
        {message}
      </Alert>
    </>
  );
};

export default AlertMessage;

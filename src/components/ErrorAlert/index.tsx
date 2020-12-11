import React from 'react';

import { Row, Col, Alert } from 'react-bootstrap';
import { BiCommentError } from 'react-icons/bi';

import IApiErrorResponse from '../../interfaces/IApiErrorResponse';

import './styles.css';

interface IErrorAlertProps {
  error: IApiErrorResponse;
  clearError: () => void;
}

const ErrorAlert: React.FC<IErrorAlertProps> = (props: IErrorAlertProps) => {
  const { error, clearError } = props;

  return (
    <Row>
      <Col>
        <Alert
          variant={error.error_code ? 'warning' : 'danger'}
          onClose={clearError}
          dismissible
        >
          <BiCommentError size="24"> </BiCommentError>
          {error.error_message}
        </Alert>
      </Col>
    </Row>
  );
};

export default ErrorAlert;

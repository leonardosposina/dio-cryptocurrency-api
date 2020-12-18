import React from 'react';

import { Row, Col } from 'react-bootstrap';
import { ImSpinner10 } from 'react-icons/im';

import './styles.css';

interface ILoadingProps {
  message: string;
}

const Loading: React.FC<ILoadingProps> = (props: ILoadingProps) => {
  const { message } = props;

  return (
    <Row>
      <Col className="loading">
        <ImSpinner10 size="100">
          <span className="sr-only">Loading...</span>
        </ImSpinner10>
        <p>{message}</p>
      </Col>
    </Row>
  );
};

export default Loading;

import React, { useEffect, useState } from 'react';

import { Row, Col } from 'react-bootstrap';
import { ImSpinner10 } from 'react-icons/im';

import './styles.css';

const Loading: React.FC = () => {
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    setTimeout(() => setMessage('Waking up the backend instance...'), 1500);
  }, []);

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

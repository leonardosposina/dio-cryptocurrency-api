import React from 'react';
import { Modal, Image, Badge } from 'react-bootstrap';

import ICryptocurrencyInfo from '../../interfaces/ICryptocurrencyInfo';

import './styles.css';

interface ICryoptoProps {
  data: ICryptocurrencyInfo;
  isVisible: boolean;
  toogleVisibility: () => void;
}

const CryptocoinModal: React.FC<ICryoptoProps> = ({
  data,
  isVisible,
  toogleVisibility,
}: ICryoptoProps) => {
  return (
    <Modal
      show={isVisible}
      onHide={toogleVisibility}
      animation={false}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <Image src={data?.logo} thumbnail />
          <div>
            {data?.name}
            &nbsp;
            <span className="symbol-name">{`(${data.symbol})`}</span>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{data?.description}</p>
        <p>
          Category:&nbsp;
          {data.category}
        </p>
      </Modal.Body>
      <Modal.Footer>
        {data.tags &&
          data.tags.map(tag => (
            <Badge variant="light" key={tag}>
              {tag}
            </Badge>
          ))}
      </Modal.Footer>
    </Modal>
  );
};

export default CryptocoinModal;

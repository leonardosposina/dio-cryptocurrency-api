import React, { useState, useCallback, useEffect } from 'react';
import { Navbar, Container, Row, Col } from 'react-bootstrap';

import { GiCoins } from 'react-icons/gi';

import Cryptocoin from '../../components/Cryptocoin';
import CryptocoinModal from '../../components/CryptocoinModal';
import ErrorAlert from '../../components/ErrorAlert';
import Loading from '../../components/Loading';

import ICryptocurrency from '../../interfaces/ICryptocurrency';
import ICryptocurrencyInfo from '../../interfaces/ICryptocurrencyInfo';
import IApiErrorResponse from '../../interfaces/IApiErrorResponse';
import IApiUsage from '../../interfaces/IApiUsage';

import api from '../../services/api';

import './styles.css';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [apiUsage, setApiUsage] = useState<IApiUsage>();
  const [apiError, setApiError] = useState<IApiErrorResponse | null>();
  const [cryptoList, setCryptoList] = useState<ICryptocurrency[]>([]);
  const [cryptoInfo, setCryptoInfo] = useState<ICryptocurrencyInfo>(
    {} as ICryptocurrencyInfo,
  );

  const handleToggleModal = useCallback(() => {
    setShowModal(!showModal);
  }, [showModal]);

  const handleError = useCallback(error => {
    if (!error.response) {
      setApiError({
        error_message: `
          We are unable to process your request at this time.
          Please try again later.
        `,
      });
    } else {
      const { status } = error.response.data;
      setApiError(status);
    }
  }, []);

  const fetchApiUsage = useCallback(() => {
    api.get('usage').then(response => {
      const { data } = response.data;
      setApiUsage(data.usage);
    });
  }, []);

  const fetchCryptocoinsList = useCallback(() => {
    api
      .get('list')
      .then(response => {
        const { data } = response.data;
        setCryptoList(data);
        fetchApiUsage();
        setIsLoading(false);
      })
      .catch(error => handleError(error));
  }, [fetchApiUsage, handleError]);

  const fetchCryptocoinInfo = useCallback(
    (id: number) => {
      api
        .get(`info/${id}`)
        .then(response => {
          const { data } = response.data;
          setCryptoInfo(data[id]);
          fetchApiUsage();
          handleToggleModal();
        })
        .catch(error => handleError(error));
    },
    [handleToggleModal, fetchApiUsage, handleError],
  );

  useEffect(() => {
    fetchCryptocoinsList();
  }, [fetchCryptocoinsList]);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#" onClick={fetchCryptocoinsList}>
          <GiCoins className="d-inline-block align-top" size="30" />
          &nbsp;
          <span className="title">Cryptocurrency App</span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {apiUsage && (
            <Navbar.Text className="credits-left">
              <small>requests left:</small>
              <small>
                today:&nbsp;
                {apiUsage.current_day.credits_left}
              </small>
              <small>
                month:&nbsp;
                {apiUsage.current_month.credits_left}
              </small>
            </Navbar.Text>
          )}
        </Navbar.Collapse>
      </Navbar>
      <Container fluid>
        {apiError && (
          <ErrorAlert error={apiError} clearError={() => setApiError(null)} />
        )}
        {isLoading && <Loading />}
        <Row>
          {cryptoList.map(crypto => (
            <Col sm={6} md={4} xl={3} key={crypto.id}>
              <Cryptocoin
                data={crypto}
                onPress={() => fetchCryptocoinInfo(crypto.id)}
              />
            </Col>
          ))}
        </Row>
      </Container>
      <CryptocoinModal
        data={cryptoInfo}
        isVisible={showModal}
        toogleVisibility={handleToggleModal}
      />
    </>
  );
};

export default App;

import React, { useState, useCallback, useEffect } from 'react';
import {
  Navbar,
  Form,
  FormControl,
  Container,
  Row,
  Col,
} from 'react-bootstrap';

import { GiCoins } from 'react-icons/gi';

import Cryptocoin from '../../components/Cryptocoin';
import CryptocoinModal from '../../components/CryptocoinModal';
import ErrorAlert from '../../components/ErrorAlert';
import Loading from '../../components/Loading';
import CreditsLeft from '../../components/CreditsLeft';

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
  const [conversionCode, setConversionCode] = useState<string>();

  const handleSetConversionCode = useCallback((currencyCode: string) => {
    localStorage.setItem('@CryptocurrencyApp:currency-code', currencyCode);
    setConversionCode(currencyCode);
  }, []);

  const handleGetConversionCode = useCallback(() => {
    const currencyCode = localStorage.getItem(
      '@CryptocurrencyApp:currency-code',
    );

    if (!currencyCode) handleSetConversionCode('USD');
    else setConversionCode(currencyCode);
  }, [handleSetConversionCode]);

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

  const fetchCryptocoinsList = useCallback(
    (convert: string | undefined) => {
      api
        .get('cryptocoins', { params: { convert } })
        .then(response => {
          const { data } = response.data;
          setCryptoList(data);
          setIsLoading(false);
        })
        .catch(error => handleError(error));
    },
    [handleError],
  );

  const fetchCryptocoinInfo = useCallback(
    (id: number) => {
      api
        .get(`cryptocoins/${id}`)
        .then(response => {
          const { data } = response.data;
          setCryptoInfo(data[id]);
          handleToggleModal();
        })
        .catch(error => handleError(error));
    },
    [handleToggleModal, handleError],
  );

  const fetchApiUsage = useCallback(() => {
    api.get('usage').then(response => {
      const { data } = response.data;
      setApiUsage(data.usage);
    });
  }, []);

  useEffect(() => {
    handleGetConversionCode();
  }, [handleGetConversionCode]);

  useEffect(() => {
    if (conversionCode) fetchCryptocoinsList(conversionCode);
  }, [conversionCode, fetchCryptocoinsList]);

  useEffect(() => {
    fetchApiUsage();
  }, [cryptoList, cryptoInfo, fetchApiUsage]);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="sm">
        <Navbar.Brand
          href=""
          onClick={() => fetchCryptocoinsList(conversionCode)}
        >
          <GiCoins className="d-inline-block align-top" size="30" />
          <span className="title"> Cryptocurrency App</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="responsive-navbar-nav justify-content-end">
          <Form inline>
            <FormControl
              id="currency-code-select"
              className="mr-sm-2 mt-sm-1"
              value={conversionCode}
              onChange={event => handleSetConversionCode(event.target.value)}
              as="select"
              custom
            >
              <option value="USD">USD</option>
              <option value="BRL">BRL</option>
            </FormControl>
          </Form>
          <Navbar.Text>
            <CreditsLeft credits={apiUsage} />
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
      <Container fluid>
        {apiError && (
          <ErrorAlert error={apiError} clearError={() => setApiError(null)} />
        )}
        {isLoading && <Loading message="Waking up the backend instance..." />}
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

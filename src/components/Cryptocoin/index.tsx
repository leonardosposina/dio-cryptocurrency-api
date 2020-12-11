import React from 'react';

import { BsGraphUp, BsGraphDown } from 'react-icons/bs';

import ICryptocurrency from '../../interfaces/ICryptocurrency';

import { currencyFormat, hourFormat, dateFormat } from '../../utils';

import {
  Container,
  Title,
  Price,
  VariationGroup,
  Variation,
  LastUpdate,
} from './styles';

interface CryptocoinProps {
  data: ICryptocurrency;
  onPress: () => void;
}

const Cryptocoin: React.FC<CryptocoinProps> = ({
  data,
  onPress,
}: CryptocoinProps) => {
  return (
    <Container onClick={onPress}>
      <Title>
        {data.name}
        <span>{`(${data.symbol})`}</span>
      </Title>
      <Price>
        {data.quote.USD.percent_change_24h > 0 ? (
          <BsGraphUp size={20} />
        ) : (
          <BsGraphDown size={20} />
        )}
        {currencyFormat(data.quote.USD.price)}
      </Price>
      <VariationGroup>
        <Variation percent={data.quote.USD.percent_change_1h}>
          <p>1 hour</p>
          <span>{`${data.quote.USD.percent_change_1h.toFixed(2)}%`}</span>
        </Variation>
        <Variation percent={data.quote.USD.percent_change_24h}>
          <p>24 hours</p>
          <span>{`${data.quote.USD.percent_change_24h.toFixed(2)}%`}</span>
        </Variation>
        <Variation percent={data.quote.USD.percent_change_7d}>
          <p>7 days</p>
          <span>{`${data.quote.USD.percent_change_7d.toFixed(2)}%`}</span>
        </Variation>
      </VariationGroup>
      <LastUpdate>
        last update:&nbsp;
        {hourFormat(data.quote.USD.last_updated)}
        &nbsp;
        {dateFormat(data.quote.USD.last_updated)}
      </LastUpdate>
    </Container>
  );
};

export default Cryptocoin;

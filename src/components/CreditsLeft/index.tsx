import React from 'react';

import { OverlayTrigger, Popover } from 'react-bootstrap';
import { MdCompareArrows } from 'react-icons/md';

import IApiUsage from '../../interfaces/IApiUsage';

import './styles.css';

interface ICreditsLeftProps {
  credits: IApiUsage | undefined;
}

const CreditsLeft: React.FC<ICreditsLeftProps> = (props: ICreditsLeftProps) => {
  const { credits } = props;

  const popover = (
    <Popover id="popover">
      <Popover.Title as="h3">Requests left:</Popover.Title>
      {credits ? (
        <Popover.Content>
          <h6>{`month: ${credits.current_month.credits_left}`}</h6>
          <h6>{`today: ${credits.current_day.credits_left}`}</h6>
        </Popover.Content>
      ) : (
        <Popover.Content>
          <h6>Fetching data...</h6>
        </Popover.Content>
      )}
    </Popover>
  );

  return (
    <OverlayTrigger placement="bottom" overlay={popover}>
      <MdCompareArrows size={32} id="popover-button" />
    </OverlayTrigger>
  );
};

export default CreditsLeft;

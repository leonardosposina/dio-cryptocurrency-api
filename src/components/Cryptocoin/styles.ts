import styled from 'styled-components/';

export const Container = styled.button`
  height: 175px;
  width: 100%;
  margin: 5px 0;
  color: var(--primary-text-color);
  border: 1px solid var(--primary-border-color);
  border-radius: 4px;
  background-image: linear-gradient(black, var(--secondary-background-color));

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  transition: 0.2s;

  &:hover {
    -moz-transform: translate(-2px, -2px);
    -ms-transform: translate(-2px, -2px);
    -o-transform: translate(-2px, -2px);
    -webkit-transform: translate(-2px, -2px);
    transform: translate(-2px, -2px);
    border: 2px solid var(--secondary-border-color);
    background-image: linear-gradient(var(--secondary-background-color), black);
  }

  &:active,
  &:focus {
    outline: none;
    border: 2px solid var(--third-border-color);
  }
`;

export const Title = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;

  span {
    font-weight: 400;
    margin-left: 5px;
    color: var(--secondary-text-color);
  }
`;

export const Price = styled.p`
  color: var(--primary-text-color);
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;

  svg {
    margin: 0 6px 5px 0;
  }
`;

export const VariationGroup = styled.div`
  width: 100%;
  margin-bottom: 10px;

  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const Variation = styled.div<{ percent: number }>`
  p {
    font-size: 15px;
    font-weight: 100;
    margin-bottom: 3px;
  }

  span {
    color: ${props => (props.percent > 0 ? 'dodgerblue' : 'red')};
    font-weight: bold;
  }
`;

export const LastUpdate = styled.p`
  font-size: 10px;
  font-weight: 100;
  color: var(--secondary-text-color);
`;

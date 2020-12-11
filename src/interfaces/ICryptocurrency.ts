interface ICryptocurrencyQuote {
  USD: {
    price: number;
    percent_change_1h: number;
    percent_change_24h: number;
    percent_change_7d: number;
    last_updated: string;
  };
}

interface ICryptocurrency {
  id: number;
  name: string;
  symbol: string;
  quote: ICryptocurrencyQuote;
  max_supply: number;
  total_supply: number;
  tags: [string];
}

export default ICryptocurrency;

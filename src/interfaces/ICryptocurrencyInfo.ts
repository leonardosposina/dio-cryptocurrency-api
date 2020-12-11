interface ICryptocurrencyInfo {
  name: string;
  symbol: string;
  category: string;
  logo: string;
  description: string;
  tags: [string];
  urls: { website: string };
}

export default ICryptocurrencyInfo;

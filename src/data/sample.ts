export interface Asset {
  id: number;
  ticker: string;
  name: string;
  price: number;
  changePercent: number;
  aiInsight?: string;
  volume?: string;
  marketCap?: string;
  details?: string;
}

export const generateIncreasingStockData = (length = 20) => {
  const rawData = Array.from({ length }, (_, i) =>
    Math.floor(Math.random() * 100 * (10 / (-i + 27))),
  );

  // Normalize
  const maxValue = Math.max(...rawData);
  return rawData.map((value) => Math.round((value / maxValue) * 100));
};

export const mockStocks: Asset[] = [
  {
    id: 1,
    ticker: "AAPL",
    name: "Apple Inc.",
    price: 150.25,
    changePercent: +5.2,
    aiInsight: "Strong demand for new product lineup.",
  },
  {
    id: 2,
    ticker: "TSLA",
    name: "Tesla, Inc.",
    price: 710.5,
    changePercent: -2.4,
    aiInsight: "Recent volatility due to supply chain concerns.",
  },
  {
    id: 3,
    ticker: "AMZN",
    name: "Amazon.com, Inc.",
    price: 3300.75,
    changePercent: +0.5,
    aiInsight: "Steady growth in e-commerce and cloud services.",
  },
  {
    id: 4,
    ticker: "GOOGL",
    name: "Alphabet Inc.",
    price: 2835.1,
    changePercent: +3.1,
    aiInsight: "Positive outlook on ad revenue and AI ventures.",
  },
  {
    id: 5,
    ticker: "NFLX",
    name: "Netflix, Inc.",
    price: 550.1,
    changePercent: -1.1,
    aiInsight: "Subscriber growth slowing compared to last quarter.",
  },
];

export const tableStocks: Asset[] = [
  {
    id: 6,
    ticker: "MSFT",
    name: "Microsoft Corporation",
    price: 290.3,
    changePercent: +2.0,
    volume: "25M",
    marketCap: "2.2T",
  },
  {
    id: 7,
    ticker: "NVDA",
    name: "NVIDIA Corporation",
    price: 220.1,
    changePercent: +4.2,
    volume: "12M",
    marketCap: "550B",
  },
  {
    id: 8,
    ticker: "INTC",
    name: "Intel Corporation",
    price: 53.25,
    changePercent: -0.8,
    volume: "30M",
    marketCap: "214B",
  },
  {
    id: 9,
    ticker: "META",
    name: "Meta Platforms, Inc.",
    price: 330.12,
    changePercent: +1.8,
    volume: "18M",
    marketCap: "930B",
  },
];

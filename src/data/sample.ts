interface Asset {
  id: number;
  ticker: string;
  companyName: string;
  price: number;
  changePercent: number;
  aiInsight?: string;
  volume?: string;
  marketCap?: string;
}

export const featuredAssets: Asset[] = [
  {
    id: 1,
    ticker: "AAPL",
    companyName: "Apple Inc.",
    price: 150.25,
    changePercent: +1.2,
    aiInsight: "Strong demand for new product lineup.",
  },
  {
    id: 2,
    ticker: "TSLA",
    companyName: "Tesla, Inc.",
    price: 710.5,
    changePercent: -2.4,
    aiInsight: "Recent volatility due to supply chain concerns.",
  },
  {
    id: 3,
    ticker: "AMZN",
    companyName: "Amazon.com, Inc.",
    price: 3300.75,
    changePercent: +0.5,
    aiInsight: "Steady growth in e-commerce and cloud services.",
  },
  {
    id: 4,
    ticker: "GOOGL",
    companyName: "Alphabet Inc.",
    price: 2835.1,
    changePercent: +3.1,
    aiInsight: "Positive outlook on ad revenue and AI ventures.",
  },
  {
    id: 5,
    ticker: "NFLX",
    companyName: "Netflix, Inc.",
    price: 550.1,
    changePercent: -1.1,
    aiInsight: "Subscriber growth slowing compared to last quarter.",
  },
];

export const tableStocks: Asset[] = [
  {
    id: 6,
    ticker: "MSFT",
    companyName: "Microsoft Corporation",
    price: 290.3,
    changePercent: +2.0,
    volume: "25M",
    marketCap: "2.2T",
  },
  {
    id: 7,
    ticker: "NVDA",
    companyName: "NVIDIA Corporation",
    price: 220.1,
    changePercent: +4.2,
    volume: "12M",
    marketCap: "550B",
  },
  {
    id: 8,
    ticker: "INTC",
    companyName: "Intel Corporation",
    price: 53.25,
    changePercent: -0.8,
    volume: "30M",
    marketCap: "214B",
  },
  {
    id: 9,
    ticker: "META",
    companyName: "Meta Platforms, Inc.",
    price: 330.12,
    changePercent: +1.8,
    volume: "18M",
    marketCap: "930B",
  },
];

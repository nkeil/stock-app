"use client";

import { featuredAssets, tableStocks } from "@/data/sample";
import React, { ChangeEvent, CSSProperties, useState } from "react";

interface Props {
  query: string;
}

export function Results({ query }: Props) {
  const [searchQuery, setSearchQuery] = useState(query);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredFeaturedStocks = featuredAssets.filter((stock) => {
    const query = searchQuery.toLowerCase();
    return (
      stock.ticker.toLowerCase().includes(query) ||
      stock.companyName.toLowerCase().includes(query) ||
      stock.aiInsight?.toLowerCase().includes(query)
    );
  });

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? filteredFeaturedStocks.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === filteredFeaturedStocks.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const currentFeaturedStock =
    filteredFeaturedStocks.length > 0 ? filteredFeaturedStocks[currentIndex] : null;

  return (
    <div className="App" style={styles.appContainer}>
      <header style={styles.header}>
        <h1 style={styles.title}>AI-Integrated Stock Trading</h1>
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search stocks or query (e.g., 'tech stocks')..."
            value={searchQuery}
            onChange={handleSearchChange}
            style={styles.searchInput}
          />
        </div>
      </header>

      <main style={styles.mainSection}>
        <section style={styles.carouselSection}>
          <h2>Featured Stocks</h2>
          {currentFeaturedStock ? (
            <div style={styles.carouselContainer}>
              <button style={styles.navButton} onClick={handlePrev}>
                &lt;
              </button>
              <div style={styles.carouselCard}>
                <h3>{currentFeaturedStock.ticker}</h3>
                <p>{currentFeaturedStock.companyName}</p>
                <p>
                  Price: <strong>${currentFeaturedStock.price.toFixed(2)}</strong>
                </p>
                <p
                  style={{
                    color: currentFeaturedStock.changePercent >= 0 ? "green" : "red",
                  }}
                >
                  {currentFeaturedStock.changePercent >= 0 ? "+" : ""}
                  {currentFeaturedStock.changePercent}%
                </p>
                <p style={{ fontStyle: "italic" }}>AI Insight: {currentFeaturedStock.aiInsight}</p>
              </div>
              <button style={styles.navButton} onClick={handleNext}>
                &gt;
              </button>
            </div>
          ) : (
            <p>No stocks found for your query.</p>
          )}
        </section>

        <section style={styles.tableSection}>
          <h2>All Results</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Ticker</th>
                <th>Company Name</th>
                <th>Price</th>
                <th>Change (%)</th>
                <th>Volume</th>
                <th>Market Cap</th>
              </tr>
            </thead>
            <tbody>
              {tableStocks.map((stock) => {
                const isPositive = stock.changePercent >= 0;
                return (
                  <tr key={stock.id}>
                    <td>{stock.ticker}</td>
                    <td>{stock.companyName}</td>
                    <td>${stock.price.toFixed(2)}</td>
                    <td style={{ color: isPositive ? "green" : "red" }}>
                      {isPositive ? "+" : ""}
                      {stock.changePercent}%
                    </td>
                    <td>{stock.volume}</td>
                    <td>{stock.marketCap}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </main>

      <footer style={styles.footer}>
        <p>&copy; {new Date().getFullYear()} AI Trading Platform. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  appContainer: {
    fontFamily: "Arial, sans-serif",
    margin: 0,
    padding: 0,
    maxWidth: "1200px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  header: {
    backgroundColor: "#101F33",
    color: "#FFF",
    display: "flex",
    flexDirection: "column",
    padding: "1rem",
    alignItems: "center",
  },
  title: {
    margin: 0,
    fontSize: "1.8rem",
  },
  searchContainer: {
    marginTop: "1rem",
    width: "100%",
    maxWidth: "600px",
  },
  searchInput: {
    width: "100%",
    padding: "0.5rem",
    fontSize: "1rem",
  },
  mainSection: {
    padding: "1rem",
  },
  carouselSection: {
    marginBottom: "2rem",
  },
  carouselContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "1rem",
  },
  carouselCard: {
    backgroundColor: "#F5F5F5",
    padding: "1rem",
    margin: "0 1rem",
    width: "250px",
    textAlign: "center",
    borderRadius: "5px",
  },
  navButton: {
    fontSize: "1.5rem",
    cursor: "pointer",
    background: "none",
    border: "none",
  },
  tableSection: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  footer: {
    backgroundColor: "#F0F0F0",
    textAlign: "center",
    padding: "1rem",
    marginTop: "2rem",
  },
};

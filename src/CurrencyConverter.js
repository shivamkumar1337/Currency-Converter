import { useState, useEffect } from "react";
import "./App.css";
import CountryList from "./Codes";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(80); // Example rate, replace with dynamic API data

  // Function to fetch exchange rate
  const fetchExchangeRate = async () => {
    try {
      const response = await fetch(
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency.toLowerCase()}.json`
      );
      const data = await response.json();

      if (data[fromCurrency.toLowerCase()][toCurrency.toLowerCase()]) {
        setExchangeRate(
          data[fromCurrency.toLowerCase()][toCurrency.toLowerCase()]
        );
      } else {
        console.error(
          `Exchange rate for ${toCurrency} not found in the API response.`
        );
        alert(
          `Exchange rate for ${toCurrency.toUpperCase()} is not available. Please try another currency.`
        );
      }
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
      alert("Failed to fetch exchange rate. Please try again later.");
    }
  };

  useEffect(() => {
    handleConvert();
  }, [amount]);
  useEffect(() => {
    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  const handleConvert = () => {
    if (amount && !isNaN(amount)) {
      setConvertedAmount((amount * exchangeRate).toFixed(2));
    } else {
      alert("Please enter a valid number!");
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h2>Currency Converter</h2>
        <div className="form">
          <div className="amount">
            <p>Enter Amount</p>
            <input
              value={amount}
              type="number"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="dropdown">
            <div className="from">
              <p>From</p>
              <div className="select-container">
                <img
                  src={`https://flagsapi.com/${CountryList[fromCurrency]}/flat/64.png`}
                  alt="From Flag"
                />
                <select
                  name="from"
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                >
                  {Object.keys(CountryList).map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <img
              src="/rightleft.png"
              alt="Switch Currencies"
              height="40vh"
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: "2vh",
              }}
            />
            <div className="to">
              <p>To</p>
              <div className="select-container">
                <img
                  src={`https://flagsapi.com/${CountryList[toCurrency]}/flat/64.png`}
                  alt="To Flag"
                />
                <select
                  name="to"
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                >
                  {Object.keys(CountryList).map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="msg">
            {exchangeRate
              ? `1 ${fromCurrency.toUpperCase()} = ${exchangeRate} ${toCurrency.toUpperCase()}`
              : "Loading..."}
          </div>
          {/* <button className="form button" onClick={handleConvert}>
            Convert
          </button> */}
          {convertedAmount && (
            <div className="result">
              <p>
                {amount} {fromCurrency.toUpperCase()} = {convertedAmount}{" "}
                {toCurrency.toUpperCase()}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;

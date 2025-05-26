import React from "react";
import { useEffect, useState } from "react";
import CurrencySelect from "./CurrencySelect";
import { Toaster, toast } from "react-hot-toast";

export default function KonverzijaContent({ user, setUser }) {
  const [amount, setAmount] = useState(100);
  const [fromCurrency, setFromCurrency] = useState("RSD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSufficientFunds, setIsSufficientFunds] = useState(true);
  const [rate, setRate] = useState(0); // Added rate state

  useEffect(() => {
    getExchangeRate();
  }, [fromCurrency, amount, toCurrency]);

  // Swap the values of fromCurrency and toCurrency
  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const getExchangeRate = async () => {
    const API_KEY = "PASTE-YOUR-API"; // Paste your api key here
    const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}`;

    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw Error("Something went wrong!");

      const data = await response.json();
      const conversionRate = data.conversion_rate; // Store the conversion rate
      const calculatedRate = (conversionRate * amount).toFixed(2);
      setRate(calculatedRate); // Set the rate state
      setResult(`${amount} ${fromCurrency} = ${calculatedRate} ${toCurrency}`);
    } catch (error) {
      setResult("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (user.balance[fromCurrency.toLowerCase()] < amount) {
      setIsSufficientFunds(false);
      toast.error("Transakcija nije uspela.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/exchange", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fromCurrency,
          toCurrency,
          amount,
          rate,
          email: user?.email,
        }),
      });

      if (!response.ok) {
        throw new Error("Exchange failed");
      } else {
        // Optionally, update the user balance locally after successful exchange
        const updatedUser = await response.json();
        setUser(updatedUser);
        setIsSufficientFunds(true);
        toast.success("Transakcija uspešna!");
      }

      getExchangeRate(); // Refresh the exchange rate
    } catch (error) {
      console.error("Error during exchange:", error);
      setResult("Exchange failed");
      toast.error("Transakcija nije uspela.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="tradeBox">
      <div className="inputs">
        <div className="currency-converter">
          <h2 className="converter-title">Konverzija valuta</h2>
          <form className="converter-form" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label className="form-label">Unesite vrednost</label>
              <input
                type="number"
                className="form-input"
                value={amount}
                onChange={(e) => {
                  const value = e.target.value;
                  setAmount(value);
                }}
                required
              />
            </div>

            <div className="form-group form-currency-group">
              <div className="form-section">
                <label className="form-label">Iz</label>
                <CurrencySelect
                  selectedCurrency={fromCurrency}
                  handleCurrency={(e) => {
                    setFromCurrency(e.target.value);
                  }}
                />
              </div>

              <div className="swap-icon" onClick={handleSwapCurrencies}>
                <svg
                  width="16"
                  viewBox="0 0 20 19"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.13 11.66H.22a.22.22 0 0 0-.22.22v1.62a.22.22 0 0 0 .22.22h16.45l-3.92 4.94a.22.22 0 0 0 .17.35h1.97c.13 0 .25-.06.33-.16l4.59-5.78a.9.9 0 0 0-.7-1.43zM19.78 5.29H3.34L7.26.35A.22.22 0 0 0 7.09 0H5.12a.22.22 0 0 0-.34.16L.19 5.94a.9.9 0 0 0 .68 1.4H19.78a.22.22 0 0 0 .22-.22V5.51a.22.22 0 0 0-.22-.22z"
                    fill="#fff"
                  />
                </svg>
              </div>

              <div className="form-section">
                <label className="form-label">U</label>
                <CurrencySelect
                  selectedCurrency={toCurrency}
                  handleCurrency={(e) => setToCurrency(e.target.value)}
                />
              </div>
            </div>

            <p className="exchange-rate-result">
              {/* Display the conversion result */}
              {isLoading ? "Getting exchange rate..." : result}
            </p>

            <button
              type="submit"
              className={`${isLoading ? "loading" : ""} swapButton`}
              disabled={!isSufficientFunds}
            >
              Potvrdi
            </button>
            {!isSufficientFunds && (
              <p className="error-message">
                Nedovoljna sredstva. Proverite račun.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

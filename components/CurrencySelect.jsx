// Array of currency codes
const currencyCodes = ["RSD", "EUR", "USD", "GBP", "RUB"];

const CurrencySelect = ({ selectedCurrency, handleCurrency }) => {
  // Extract the country code from the selected currency code
  const countryCode = selectedCurrency.substring(0, 2).toLowerCase();

  return (
    <div className="currency-select">
      <img src={`https://flagcdn.com/64x48/${countryCode}.png`} alt="" />
      <select
        onChange={handleCurrency}
        className="currency-dropdown"
        value={selectedCurrency}
      >
        {currencyCodes.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelect;

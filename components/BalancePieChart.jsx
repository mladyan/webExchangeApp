import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useEffect, useState } from "react";

const COLORS = ["#8e95c3", "#444655", "#a8aabc", "#c6878b", "#8e5559"];

export default function BalancePieChart({ user }) {
  const [exchangeRates, setExchangeRates] = useState({});
  const [data, setData] = useState([]);
  console.log(user.balance);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      const API_KEY = "44d73a29ae4863083d430a2b";
      const currencies = Object.keys(user.balance ?? {});
      const exchangeRates = {};

      for (const currency of currencies) {
        if (currency === "rsd") {
          exchangeRates[currency] = 1; // RSD to RSD is 1
          continue;
        }
        const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${currency.toUpperCase()}/RSD`;
        try {
          const response = await fetch(API_URL);
          if (!response.ok) throw new Error("Something went wrong!");
          const data = await response.json();
          exchangeRates[currency] = data.conversion_rate;
        } catch (error) {
          console.error(`Error fetching exchange rate for ${currency}:`, error);
          exchangeRates[currency] = null; // Indicate failure
        }
      }
      setExchangeRates(exchangeRates);
    };

    fetchExchangeRates();
  }, [user.balance]);

  useEffect(() => {
    if (Object.keys(exchangeRates).length > 0) {
      const newData = Object.entries(user.balance ?? {}).map(([key, value]) => {
        const exchangeRate = exchangeRates[key];
        const valueInRSD = exchangeRate ? Number(value) * exchangeRate : 0; // Use 0 if rate is null
        return {
          name: key.toUpperCase(),
          value: valueInRSD,
        };
      });
      setData(newData);
    }
  }, [exchangeRates]);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    if (percent < 0.01) return null;
    const RADIAN = Math.PI / 180;
    // Calculate label position
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {(percent * 100).toFixed(0)}%
      </text>
    );
  };

  return (
    <div className="w-[50%] max-w-md mx-auto">
      <PieChart width={400} height={380}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={110}
          fill="#8884d8"
          labelLine={false}
          label={renderCustomizedLabel}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => Number.parseFloat(value).toFixed(2)} />
        <Legend />
      </PieChart>
    </div>
  );
}

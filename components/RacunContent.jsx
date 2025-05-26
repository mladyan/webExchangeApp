import React from "react";
import BalancePieChart from "./BalancePieChart";

export default function RacunContent({ user }) {
  console.log(user);
  return (
    // <div>
    //   <h1>Račun Content</h1>
    //   <p>EUR: </p>
    //   <p>RSD: {user.balance.rsd}</p>
    //   <p>USD: {user.balance.usd}</p>
    //   <p>GBP: {user.balance.gbp}</p>
    //   <p>RUB: {user.balance.rub}</p>
    // </div>
    <div className="tradeBox">
      <div className="inputs">
        <div className="currency-converter" style={{ width: "800px" }}>
          <h2 className="converter-title">Račun</h2>
          <div className="flex">
            <BalancePieChart user={user} />
            <div className="w-[50%]">
              <div className="w-full bg-gradient-to-br text-white shadow-xl rounded-2xl p-6">
                <div className="flex justify-between items-center bg-white bg-opacity-10 p-4 rounded-xl mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">€</span>
                    <span className="text-lg font-medium">EUR</span>
                  </div>
                  <span className="text-lg font-bold">
                    {user.balance.eur.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center bg-white bg-opacity-10 p-4 rounded-xl mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">$</span>
                    <span className="text-lg font-medium">USD</span>
                  </div>
                  <span className="text-lg font-bold">
                    {user.balance.usd.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center bg-white bg-opacity-10 p-4 rounded-xl mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">₽</span>
                    <span className="text-lg font-medium">RUB</span>
                  </div>
                  <span className="text-lg font-bold">
                    {user.balance.rub.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center bg-white bg-opacity-10 p-4 rounded-xl mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">£</span>
                    <span className="text-lg font-medium">GBP</span>
                  </div>
                  <span className="text-lg font-bold">
                    {user.balance.gbp.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center bg-white bg-opacity-10 p-4 rounded-xl mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">д</span>
                    <span className="text-lg font-medium">RSD</span>
                  </div>
                  <span className="text-lg font-bold">
                    {user.balance.rsd.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

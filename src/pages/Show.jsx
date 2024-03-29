import React from "react";
import showStore from "../stores/showStore";
import { useParams } from "react-router-dom";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Header from "../components/Header";

export default function Show() {
  const store = showStore();
  const params = useParams();

  React.useEffect(() => {
    store.fetchData(params.id);

    return () => {
      store.graphData = null;
    };
  }, []);

  return (
    <div>
      <Header back={"true"} />
      {store.coinData && (
        <>
          <header className="show-header">
            <img src={store.coinData.image} alt="" />

            <h2>
              {store.coinData.name}({store.coinData.symbol})
            </h2>
          </header>
          <div className="width">
            <div className="show-graph">
              <ResponsiveContainer width={"100%"} height={"100%"}>
                <AreaChart
                  data={store.graphData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#33adff" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#33adff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="Date" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="Price"
                    stroke="#33adff"
                    strokeWidth={3}
                    fill="url(#colorUv)"
                    fillOpacity={0.5}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="show-details">
            <h2>Details</h2>
            <div className="show-details-row">
              <h3>Market cap rank</h3>
              <span> {store.coinData.market_cap_rank}</span>
            </div>
            <div className="show-details-row">
              <h3>24h high</h3>
              <span>${store.coinData.high_24h}</span>
            </div>

            <div className="show-details-row">
              <h3>24h low</h3>
              <span>${store.coinData.low_24h}</span>
            </div>
            <div className="show-details-row">
              <h3>Circulating supply</h3>
              <span>${store.coinData.circulating_supply}</span>
            </div>
            <div className="show-details-row">
              <h3>Current price</h3>
              <span>${store.coinData.current_price}</span>
            </div>
            <div className="show-details-row">
              <h3>1y change</h3>
              <span>
                {/* {(store.coinData.price_change_percentage_ly).toFixed(2)}% */}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

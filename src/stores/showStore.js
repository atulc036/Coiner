import { create } from "zustand";
import axios from "axios";

const showStore = create((set) => ({
  graphData: [],
  data:null,
  
  coinData:{},
  fetchData: async (id) => {
    const [graphRes , dataRes]= await Promise.all([
        axios.get(
            `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=121`
          ),
          axios.get(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&market_data=true' \ -H 'accept: application/json`)
    ])
    const graphData = graphRes.data.prices.map((price) => {
      const [timestamp, p] = price;
      const date= new Date(timestamp).toLocaleDateString("en-us")
      return {
        Date: date,
        Price: p,
      };
    });

    
    set({graphData:graphData})
    
    const coinData = {
        image: dataRes.data.image.large,
        name: dataRes.data.name,
        symbol: dataRes.data.symbol,
        market_cap_rank:dataRes.data.market_data.market_cap_rank,
        high_24h: dataRes.data.market_data.high_24h.usd,
        low_24h: dataRes.data.market_data.low_24h.usd,
        circulating_supply: dataRes.data.market_data.circulating_supply,
        current_price: dataRes.data.market_data.current_price.usd,
        price_change_percentage_ly: dataRes.data.market_data.price_change_percentage_1y
      }
      
      set({coinData})
    console.log(coinData)
  },
}));
export default showStore;

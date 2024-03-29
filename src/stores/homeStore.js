import { create } from "zustand";
import axios from "axios";
import debounce from "../components/helpers/debounce";

const homeStore = create((set) => ({
  coins: [],
  trending: [],
  query: "",
  searching:false,
  searched:false,
  setQuery: (e) => {
    set({searching:true,searching:false})
    set({ query: e.target.value });
    homeStore.getState().searchCoins();
  },

  searchCoins: debounce(async () => {
    const { query, trending } = homeStore.getState();
    if (query.length > 2) {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/search?query=${query}`
      );
      const coins = res.data.coins.map((coin) => {
        return {
          name: coin.name,
          image: coin.large,
          id: coin.id,
        };
      });
      set({ coins: coins ,searching:false,searched:true});
    } else {
      set({ coins: trending ,searching:false,searched:false});
    }
  }, 500),

  fetchCoins: async () => {
    const [res, btcRes] = await Promise.all([
      axios.get("https://api.coingecko.com/api/v3/search/trending"),
      axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`
      ),
    ]);
   const btcPrice = btcRes.data.bitcoin.usd;
    const coins = res.data.coins.map((coin) => {
      return {
        name: coin.item.name,
        image: coin.item.large,
        id: coin.item.id,
        price: coin.item.price,
        priceBtc: (coin.item.price_btc).toFixed(6),
        priceUsd: (coin.item.price_btc * btcPrice).toFixed(6),
        
      };
      
    });
    set({ coins, trending: coins });
    console.log(coins[0].priceUsd)
    
  },
}));
export default homeStore;

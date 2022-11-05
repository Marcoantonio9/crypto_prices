import axios from 'axios'
const url = `https://api.coingecko.com/api/v3`

const simplePrice = async (cryptoSelected) => {
  const { data } = await axios.get(`${url}/simple/price?ids=${cryptoSelected}&vs_currencies=brl`)
  return data[`${cryptoSelected}`].brl
}

const marketChartRange = async (cryptoSelected, fromTimestamp, toTimestamp) => {
  const { data } = await axios.get(`${url}/coins/${cryptoSelected}/market_chart/range?vs_currency=brl&from=${fromTimestamp}&to=${toTimestamp}`)
  return data.prices[0][1]
}

const marketChartHistory = async (cryptoSelected) => {
  const { data } = await axios.get(`${url}/coins/${cryptoSelected}/market_chart?vs_currency=brl&days=30&interval=daily`)
  return data
}


export {
  simplePrice,
  marketChartRange,
  marketChartHistory
}
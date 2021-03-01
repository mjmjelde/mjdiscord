import Finnhub from './lib/stocks/finnhub';

async function test() {
  const symbols = await Finnhub.crypto.symbols('binance');
  const symbol = symbols.find(c => c.symbol == 'BINANCE:ALGOUSDT');
  
  Finnhub.crypto.candles(symbol).then((data) => {
    // console.log(data);
  });

  Finnhub.socket.subscribe('BINANCE:ALGOUSDT');
  Finnhub.socket.subscribe('BINANCE:BTCUSDT');
  Finnhub.socket.subscribe('AAPL');
  Finnhub.socket.on('message', (data) => {
    console.log(data);
  })
}

test();
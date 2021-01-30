import {Finnhub} from './lib/stocks/finnhub';

const finn = new Finnhub('c090skf48v6tm13rkbb0');

async function test() {
  const symbols = await finn.symbols();
  const GMESymbol = symbols.find(c => c.symbol == "GME");
  const APPLSymbol = symbols.find(c => c.symbol == "AAPL");
  console.log(APPLSymbol);
  const GMEProfile = await finn.profile2(GMESymbol);
  console.log(GMEProfile);
  const quote = await finn.quote(GMESymbol);
  console.log(quote);
}

test();
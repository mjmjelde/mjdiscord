import WebSocket from "ws";

async function test() {
  const ws = new WebSocket('wss://ws-feed.exchange.coinbase.com');
  
  ws.on('open', () => {
    ws.send(JSON.stringify({
      type: "subscribe",
      product_ids: [
        'BTC-USD'
      ],
      channels: ['ticker']
    }))
  });

  ws.on('message', (message) => {
    console.log(message.toString());
  })
}

test();
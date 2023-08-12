const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const axios = require('axios');
const ALCHEMY_API_KEY = 'XXXXXXXXXXXXXXXXXXXXXXXXX'; // Replace with your Alchemy API key

const { createAlchemyWeb3 } = require('@alch/alchemy-web3');
const web3 = createAlchemyWeb3("wss://eth-mainnet.ws.alchemyapi.io/ws/"+ALCHEMY_API_KEY);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected.');

  // Subscribe to new pending transactions
  const subscription = web3.eth.subscribe('pendingTransactions', (error, result) => {
    if (!error) {
      console.log(result);
    }
    
  });

  // Listen to incoming transactions and emit them to the frontend
  subscription.on('data', async (txHash) => {
    const transaction = await web3.eth.getTransaction(txHash);
    socket.emit('transaction', transaction);
  });

  // Handle errors
  subscription.on('error', console.error);

  socket.on('disconnect', () => {
    subscription.unsubscribe((error, success) => {
      if (success) {
        console.log('Unsubscribed successfully.');
      }
    });
  });
});

const port = 3000;



http.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


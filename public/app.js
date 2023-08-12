const socket = io();

const transactionList = document.getElementById('transaction-list');

socket.on('transaction', (transaction) => {
  const listItem = document.createElement('div');
  listItem.innerHTML  = `<div class="rounded-md p-4 border-2 mb-6 shadow-md bg-white "><p class="text-xl font-normal text-gray-900">Transaction Hash:</p> ${transaction.hash}, <p class="text-xl font-normal text-gray-900">Block Number:</p> ${transaction.blockNumber}, <p class="text-xl font-normal text-gray-900">From:</p> ${transaction.from}, <p class="text-xl font-normal text-gray-900">To:</p> ${transaction.to}, <p class="text-xl font-normal text-gray-900">Value:</p> ${transaction.value}</div>`;
  transactionList.appendChild(listItem);
});

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const INFURA_ID = 'YOUR_INFURA_PROJECT_ID';
const provider = new ethers.providers.JsonRpcProvider(`https://rpc.mantle.xyz`);
const address = '0xDCBc586cAb42a1D193CaCD165a81E5fbd9B428d7';

const WalletBalance = () => {
  const [balance, setBalance] = useState(null);
  const [percentageChange, setPercentageChange] = useState(null);

  const fetchBalance = async () => {
    
  const fetchBalance = async () => {
    try {
      const currentBalance = await provider.getBalance(address);
      const formattedBalance = ethers.utils.formatEther(currentBalance);
      setBalance(formattedBalance);

      // Fetch balance 12 hours ago
      const twelveHoursAgo = Math.floor(Date.now() / 1000) - 12 * 60 * 60;
      const historicalBalance = await provider.getBalance(address, twelveHoursAgo);
      const formattedHistoricalBalance = ethers.utils.formatEther(historicalBalance);

      // Calculate percentage change
      const change = ((currentBalance.sub(historicalBalance)).div(historicalBalance)).mul(100);
      setPercentageChange(change);

      // Check for alert condition
      if (change < -10) {
        alert('Your balance has reduced by more than 10% in the last 12 hours!');
      }
    } catch (error) {
      console.error('Error fetching balance:', error.message);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []); // Fetch balance on component mount

    // ... (same as before)
  };

  useEffect(() => {
    fetchBalance();
  }, []); // Fetch balance on component mount

  return (
    <div>
      <h1>Wallet Balance</h1>
      <p>Address: {address}</p>
      <p>Current Balance: {balance} ETH</p>
      <p>Percentage Change (last 12 hours): {percentageChange}%</p>
    </div>
  );
};

export default WalletBalance;

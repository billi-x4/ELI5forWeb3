"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  WalletIcon,
  CoinsIcon,
  ArrowRightLeftIcon,
  BarChart3Icon,
} from "lucide-react";

// Use the types defined above

const Component: React.FC<MetaMaskDAppProps> = () => {
  const [state, setState] = useState<MetaMaskDAppState>({
    isConnected: false,
    account: null,
    balance: null,
    tokens: [],
    transactions: [],
  });

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection: CheckConnection = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setState((prevState) => ({
            ...prevState,
            isConnected: true,
            account: accounts[0],
          }));
          getBalance(accounts[0]);
        }
      } catch (error) {
        console.error(
          "An error occurred while checking the connection:",
          error
        );
      }
    }
  };

  const connectWallet: ConnectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        setState((prevState) => ({
          ...prevState,
          isConnected: true,
          account: accounts[0],
        }));
        getBalance(accounts[0]);
      } catch (error) {
        console.error("An error occurred while connecting the wallet:", error);
      }
    } else {
      alert(
        "MetaMask is not installed. Please install it to use this feature."
      );
    }
  };

  const getBalance: GetBalance = async (address) => {
    try {
      const balance = await window.ethereum!.request({
        method: "eth_getBalance",
        params: [address, "latest"],
      });
      setState((prevState) => ({
        ...prevState,
        balance: parseFloat(parseInt(balance, 16) / 1e18).toFixed(4),
      }));
    } catch (error) {
      console.error("An error occurred while fetching the balance:", error);
    }
  };

  const handleSendToken: HandleSendToken = async (recipient, amount) => {
    // Implement token sending logic here
    console.log(`Sending ${amount} tokens to ${recipient}`);
  };

  const handleDisconnect: HandleDisconnect = () => {
    setState({
      isConnected: false,
      account: null,
      balance: null,
      tokens: [],
      transactions: [],
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-4 flex justify-end">
        {state.isConnected ? (
          <Button variant="outline" onClick={handleDisconnect}>
            <WalletIcon className="mr-2 h-4 w-4" />
            {state.account
              ? `${state.account.slice(0, 6)}...${state.account.slice(-4)}`
              : "Connected"}
          </Button>
        ) : (
          <Button onClick={connectWallet}>
            <WalletIcon className="mr-2 h-4 w-4" />
            Connect with MetaMask
          </Button>
        )}
      </div>

      {state.isConnected && (
        <div className="mt-8 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Wallet Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Address:</strong> {state.account}
              </p>
              <p>
                <strong>Balance:</strong> {state.balance} ETH
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Send Tokens</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input placeholder="Recipient Address" />
                  <Input type="number" placeholder="Amount" />
                  <Button
                    className="w-full"
                    onClick={() => handleSendToken("0x...", "0.1")}
                  >
                    <ArrowRightLeftIcon className="mr-2 h-4 w-4" />
                    Send
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Token Balances</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p>
                    <CoinsIcon className="inline mr-2 h-4 w-4" /> ETH:{" "}
                    {state.balance}
                  </p>
                  <p>
                    <CoinsIcon className="inline mr-2 h-4 w-4" /> DAI: 100.0000
                  </p>
                  <p>
                    <CoinsIcon className="inline mr-2 h-4 w-4" /> USDC: 50.0000
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>
                  <BarChart3Icon className="inline mr-2 h-4 w-4" /> Sent 0.1 ETH
                  to 0x1234...5678
                </p>
                <p>
                  <BarChart3Icon className="inline mr-2 h-4 w-4" /> Received 50
                  DAI from 0x8765...4321
                </p>
                <p>
                  <BarChart3Icon className="inline mr-2 h-4 w-4" /> Swapped 10
                  ETH for 15000 USDC
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Component;

import { useEffect, useState } from "react";
import { JsonRpcProvider, Wallet } from "ethers";
import { formatEther } from "viem";

export const useDevAccount = () => {
  const [balance, setBalance] = useState<string>("0");
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || "http://127.0.0.1:8547";
    const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY || "";

    if (!rpcUrl || !privateKey) {
      console.warn("Dev account not configured: missing RPC URL or private key");
      return;
    }

    const initDevAccount = async () => {
      try {
        const provider = new JsonRpcProvider(rpcUrl);
        const wallet = new Wallet(privateKey, provider);

        setAddress(wallet.address);

        const accountBalance = await provider.getBalance(wallet.address);
        setBalance(formatEther(accountBalance));
      } catch (err) {
        console.error("Failed to initialize dev account", err);
      }
    };

    void initDevAccount();
  }, []);

  return { balance, address };
};


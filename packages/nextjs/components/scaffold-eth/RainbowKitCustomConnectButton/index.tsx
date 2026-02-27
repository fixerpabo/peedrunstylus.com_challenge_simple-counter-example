"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useAccount, useBalance, useDisconnect } from "wagmi";
import { useNetworkColor } from "~~/hooks/scaffold-eth";
import { getTargetNetworks } from "~~/utils/scaffold-eth";
import { NetworkOptions } from "./NetworkOptions";

/**
 * Custom connect button: when disconnected shows a clear "Connect Wallet" button;
 * when connected shows address, balance, current network and a dropdown to switch network or disconnect.
 */
export const RainbowKitCustomConnectButton = () => {
  const { address, isConnected, chain } = useAccount();
  const { data: balanceData } = useBalance({ address });
  const { disconnect } = useDisconnect();
  const networkColor = useNetworkColor(chain?.id);
  const targetNetworks = getTargetNetworks();
  const isOnTargetNetwork = chain && targetNetworks.some(n => n.id === chain.id);

  if (!isConnected || !address) {
    return (
      <ConnectButton.Custom>
        {({ openConnectModal }) => (
          <button
            type="button"
            onClick={openConnectModal}
            className="btn btn-primary btn-sm"
          >
            Connect Wallet
          </button>
        )}
      </ConnectButton.Custom>
    );
  }

  const formattedBalance = balanceData?.formatted
    ? parseFloat(balanceData.formatted).toFixed(4)
    : "0.0000";

  return (
    <div className="flex items-center gap-2">
      {!isOnTargetNetwork && (
        <span className="text-xs font-medium text-error bg-error/10 px-2 py-1 rounded">
          Wrong network
        </span>
      )}
      <div className="dropdown dropdown-end">
        <label
          tabIndex={0}
          className="btn btn-primary btn-sm dropdown-toggle gap-2 px-3"
        >
          <span style={{ color: networkColor }} className="font-medium">
            {chain?.name ?? "Unknown"}
          </span>
          <span className="text-base-content/70">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
          <span className="text-xs">{formattedBalance} ETH</span>
          <ChevronDownIcon className="h-4 w-4" />
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 mt-2 shadow-lg bg-base-200 rounded-box w-56 gap-1 z-[100]"
        >
          <NetworkOptions />
          <li>
            <button
              type="button"
              className="btn btn-ghost btn-sm justify-start text-error"
              onClick={() => disconnect()}
            >
              Disconnect
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

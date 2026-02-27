import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";
import { stylusCounterAbi } from "./stylusCounterAbi";

// Use contract address from env (set by running node / sync script) so it matches the running Nitro node
const COUNTER_ADDRESS =
  (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_CONTRACT_ADDRESS) ||
  "0xa6e41ffd769491a42a6e5ce453259b93983a22ef";

const deployedContracts = {
  412346: {
    Counter: {
      address: COUNTER_ADDRESS,
      abi: stylusCounterAbi as any,
    },
  },
} as const;

export default deployedContracts satisfies GenericContractsDeclaration;
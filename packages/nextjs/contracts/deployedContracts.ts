import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";
import { stylusCounterAbi } from "./stylusCounterAbi";
const deployedContracts = {
  // Local Nitro dev node
  412346: {
    Counter: {
      address: "0xa6e41ffd769491a42a6e5ce453259b93983a22ef",
      abi: stylusCounterAbi as any,
    },
  },
  // Arbitrum Sepolia (live)
  421614: {
    Counter: {
      address: "0xf3a1d067b31aa1f18efbdd9cc3ca2c88312a2231",
      abi: stylusCounterAbi as any,
    },
  },
} as const;

export default deployedContracts satisfies GenericContractsDeclaration;
export const stylusCounterAbi = [
  {
    type: "function",
    stateMutability: "view",
    name: "number",
    inputs: [],
    outputs: [
      {
        name: "",
        internalType: "uint256",
        type: "uint256",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    name: "setNumber",
    inputs: [
      {
        name: "new_number",
        internalType: "uint256",
        type: "uint256",
      },
    ],
    outputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    name: "mulNumber",
    inputs: [
      {
        name: "new_number",
        internalType: "uint256",
        type: "uint256",
      },
    ],
    outputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    name: "addNumber",
    inputs: [
      {
        name: "new_number",
        internalType: "uint256",
        type: "uint256",
      },
    ],
    outputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    name: "increment",
    inputs: [],
    outputs: [],
  },
] as const;


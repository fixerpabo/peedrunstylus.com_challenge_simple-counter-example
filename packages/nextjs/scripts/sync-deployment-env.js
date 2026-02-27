#!/usr/bin/env node
/**
 * Syncs NEXT_PUBLIC_RPC_URL and NEXT_PUBLIC_CONTRACT_ADDRESS in .env.local
 * from packages/stylus-demo/build/stylus-deployment-info.json (written by run-dev-node.sh).
 * Run after starting the Nitro dev node so the frontend uses the deployed contract.
 */

const fs = require("fs");
const path = require("path");

const deploymentPath = path.resolve(__dirname, "../../stylus-demo/build/stylus-deployment-info.json");
const envPath = path.resolve(__dirname, "../.env.local");

if (!fs.existsSync(deploymentPath)) {
  console.error("Deployment info not found. Run the dev node first:");
  console.error("  cd packages/stylus-demo && bash run-dev-node.sh");
  process.exit(1);
}

const deployment = JSON.parse(fs.readFileSync(deploymentPath, "utf8"));
const rpcUrl = deployment.rpc_url || "http://127.0.0.1:8547";
const contractAddress = deployment.contract_address || "";

if (!contractAddress || contractAddress === "N/A") {
  console.error("No contract_address in deployment info. Ensure the Stylus deploy step completed.");
  process.exit(1);
}

const envLines = fs.existsSync(envPath)
  ? fs.readFileSync(envPath, "utf8").split("\n")
  : [];

const keys = ["NEXT_PUBLIC_RPC_URL", "NEXT_PUBLIC_CONTRACT_ADDRESS"];
const updates = {
  NEXT_PUBLIC_RPC_URL: rpcUrl,
  NEXT_PUBLIC_CONTRACT_ADDRESS: contractAddress,
};

let changed = false;
const seen = new Set();
const newLines = envLines
  .map(line => {
    const match = line.match(/^([A-Z_]+)=/);
    if (match && keys.includes(match[1])) {
      seen.add(match[1]);
      const value = updates[match[1]];
      if (value !== undefined) {
        changed = true;
        return `${match[1]}=${value}`;
      }
    }
    return line;
  })
  .filter(Boolean);

for (const key of keys) {
  if (!seen.has(key) && updates[key] !== undefined) {
    newLines.push(`${key}=${updates[key]}`);
    changed = true;
  }
}

fs.writeFileSync(envPath, newLines.join("\n") + "\n", "utf8");
console.log("Updated .env.local with:");
console.log("  NEXT_PUBLIC_RPC_URL=" + rpcUrl);
console.log("  NEXT_PUBLIC_CONTRACT_ADDRESS=" + contractAddress);
if (changed) {
  console.log("Restart the Next.js dev server (yarn dev) to pick up changes.");
}

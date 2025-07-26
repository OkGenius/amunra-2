
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { NextResponse } from "next/server";
import { ethers } from "ethers";

export async function POST(req) {
  try {
    const body = await req.json();

    const walletAddress = body.address;
    const metadata = body.metadata;

    const privateKey = process.env.PRIVATE_KEY;
    const contractAddress = process.env.NFT_DROP_ADDRESS;
    const rpcUrl = "https://polygon-mainnet.g.alchemy.com/v2/your-key"; // Or use QuickNode

    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const sdk = ThirdwebSDK.fromPrivateKey(privateKey, "polygon", { provider });
    const contract = await sdk.getContract(contractAddress, "nft-drop");

    const tx = await contract.claimTo(walletAddress, {
      metadata,
    });

    return NextResponse.json({ success: true, tx });
  } catch (error) {
    console.error("Mint error", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}

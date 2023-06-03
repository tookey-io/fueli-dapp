import { getDefaultConfig } from 'connectkit'
import { configureChains, createConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'

const walletConnectProjectId = '67d665d6fcc3e8f6b79ef7795f3c1d6b'

export const localnet = {
  id: 1337,
  name: "Local Network",
  network: "localnet",
  nativeCurrency: {
    decimals: 18,
    name: "Local Token",
    symbol: "LOC",
  },
  rpcUrls: {
    public: { http: ["http://127.0.0.1:8545"] },
    default: { http: ["http://127.0.0.1:8545"] },
  },
  contracts: {
    multicall3: {
      address: "0x171C57d06726c71d620578De5C72D3230191C58E",
      blockCreated: 1,
    },
  },
} as const;

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [localnet],
  [publicProvider()],
)
 
export const config = createConfig(
  getDefaultConfig({
    autoConnect: true,
    appName: 'My wagmi + ConnectKit App',
    walletConnectProjectId,
    chains
  })
)

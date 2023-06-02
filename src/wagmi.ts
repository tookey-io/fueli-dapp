import { getDefaultConfig } from 'connectkit'
import { createConfig } from 'wagmi'

const walletConnectProjectId = '67d665d6fcc3e8f6b79ef7795f3c1d6b'

export const config = createConfig(
  getDefaultConfig({
    autoConnect: true,
    appName: 'My wagmi + ConnectKit App',
    walletConnectProjectId,
  })
)

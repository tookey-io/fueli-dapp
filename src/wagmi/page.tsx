import { Account } from '../components/blockchain/Account'
import { Balance } from '../components/blockchain/Balance'
import { BlockNumber } from '../components/blockchain/BlockNumber'
import { ConnectKitButton } from '../components/blockchain/ConnectKitButton'
import { Connected } from '../components/blockchain/Connected'
import { NetworkSwitcher } from '../components/blockchain/NetworkSwitcher'
import { ReadContract } from '../components/blockchain/ReadContract'
import { ReadContracts } from '../components/blockchain/ReadContracts'
import { ReadContractsInfinite } from '../components/blockchain/ReadContractsInfinite'
import { SendTransaction } from '../components/blockchain/SendTransaction'
import { SendTransactionPrepared } from '../components/blockchain/SendTransactionPrepared'
import { SignMessage } from '../components/blockchain/SignMessage'
import { SignTypedData } from '../components/blockchain/SignTypedData'
import { Token } from '../components/blockchain/Token'
import { WatchContractEvents } from '../components/blockchain/WatchContractEvents'
import { WatchPendingTransactions } from '../components/blockchain/WatchPendingTransactions'
import { WriteContract } from '../components/blockchain/WriteContract'
import { WriteContractPrepared } from '../components/blockchain/WriteContractPrepared'

export function Page() {
  return (
    <>
      <h1>wagmi + ConnectKit + Next.js</h1>

      <ConnectKitButton />

      <Connected>
        <hr />
        <h2>Network</h2>
        <NetworkSwitcher />
        <br />
        <hr />
        <h2>Account</h2>
        <Account />
        <br />
        <hr />
        <h2>Balance</h2>
        <Balance />
        <br />
        <hr />
        <h2>Block Number</h2>
        <BlockNumber />
        <br />
        <hr />
        <h2>Read Contract</h2>
        <ReadContract />
        <br />
        <hr />
        <h2>Read Contracts</h2>
        <ReadContracts />
        <br />
        <hr />
        <h2>Read Contracts Infinite</h2>
        <ReadContractsInfinite />
        <br />
        <hr />
        <h2>Send Transaction</h2>
        <SendTransaction />
        <br />
        <hr />
        <h2>Send Transaction (Prepared)</h2>
        <SendTransactionPrepared />
        <br />
        <hr />
        <h2>Sign Message</h2>
        <SignMessage />
        <br />
        <hr />
        <h2>Sign Typed Data</h2>
        <SignTypedData />
        <br />
        <hr />
        <h2>Token</h2>
        <Token />
        <br />
        <hr />
        <h2>Watch Contract Events</h2>
        <WatchContractEvents />
        <br />
        <hr />
        <h2>Watch Pending Transactions</h2>
        <WatchPendingTransactions />
        <br />
        <hr />
        <h2>Write Contract</h2>
        <WriteContract />
        <br />
        <hr />
        <h2>Write Contract (Prepared)</h2>
        <WriteContractPrepared />
      </Connected>
    </>
  )
}

export default Page

import { deployments } from "@/wagmi/deployments"
import { useChainId } from "wagmi"

export const useMinterAddress = () => {
    const chainId = useChainId()
    return deployments[chainId]?.minter
}
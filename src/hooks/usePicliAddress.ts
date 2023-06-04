import { deployments } from "@/wagmi/deployments"
import { useChainId } from "wagmi"

export const usePicliAddress = () => {
    const chainId = useChainId()
    return deployments[chainId]?.picli
}
import { deployments } from "@/wagmi/deployments"
import { useChainId } from "wagmi"

export const useFueliAddress = () => {
    const chainId = useChainId()
    return deployments[chainId]?.fueli
}
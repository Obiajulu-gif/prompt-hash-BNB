'use client'

import { ReactNode } from "react"
import {
    alchemyProvider,
    argent,
    braavos,
    jsonRpcProvider,
    publicProvider,
    StarknetConfig,
    useInjectedConnectors,
    voyager
} from "@starknet-react/core"
import { mainnet, sepolia } from "@starknet-react/chains"

export function StarknetProvider({ children }: {
    children: ReactNode
}) {

    const { connectors } = useInjectedConnectors({
        recommended: [argent(), braavos()],
        includeRecommended: 'always',
        order: "alphabetical",
    })

    return (
        <StarknetConfig
            chains={[sepolia]}
            provider={
                jsonRpcProvider({
                    rpc: (chain) => ({
                        nodeUrl: 'https://starknet-sepolia.public.blastapi.io/rpc/v0_8'
                    })
                })
            }
            connectors={connectors}
            explorer={voyager}
            autoConnect
        >
            {children}
        </StarknetConfig>
    );
}
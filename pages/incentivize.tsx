import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import Layout from '../components/layout';

// Mock data - replace with actual data from your API/contracts
const pools = [
    { id: 'USDH-USDC', name: 'USDH-USDC' },
    { id: 'USDH-ETH', name: 'USDH-ETH' },
];

const whitelistedTokens = [
    { symbol: 'PEG', address: '0x...' },
    { symbol: 'USDC', address: '0x...' },
];

export default function Incentivize() {
    const [selectedPool, setSelectedPool] = useState(pools[0]);
    const [selectedToken, setSelectedToken] = useState(whitelistedTokens[0]);
    const [amount, setAmount] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);

    const poolMetrics = {
        liquidity: {
            USDH: '18,156.16',
            USDC: '18,156.16',
        },
        APR: '16.62%',
        currentVotes: '4,414.99',
        currentIncentives: '~$0',
    };

    const handleContinue = () => {
        setShowConfirmation(true);
    };

    const handleConfirm = async () => {
        // Add your contract interaction logic here
        setShowConfirmation(false);
    };

    return (
        <div className="max-w-[1200px] mx-auto  grid grid-cols-2 gap-6 mt-4">
            {/* First Card */}
            <div className="mt-8 bg-white rounded-lg">
                <div className="border border-gray-200 p-4">
                    <div className="mb-8">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="w-12 h-8 bg-gray-100 rounded"></div>
                            <select
                                value={selectedPool.id}
                                onChange={(e) => setSelectedPool(pools.find(p => p.id === e.target.value) || pools[0])}
                                className="flex-1 p-2 border rounded bg-white"
                            >
                                {pools.map((pool) => (
                                    <option key={pool.id} value={pool.id}>
                                        {pool.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="text-sm text-gray-500">Curve</div>
                    </div>

                    <div className="border-t border-b border-gray-200 py-6 mb-6">
                        <div className="flex justify-between mb-2">
                            <div className="text-gray-600">Liquidity</div>
                            <div className="text-gray-600">Your Deposit</div>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                            <div>{poolMetrics.liquidity.USDH} USDH</div>
                            <div>0 USDH</div>
                        </div>
                        <div className="flex justify-between text-sm">
                            <div>{poolMetrics.liquidity.USDC} USDC</div>
                            <div>0 USDC</div>
                        </div>
                    </div>

                    <div className="border-b border-gray-200 py-6 mb-6">
                        <div className="grid grid-cols-3 gap-4 mb-2">
                            <div className="text-gray-600">APR</div>
                            <div className="text-gray-600">Current Votes</div>
                            <div className="text-gray-600">Current Incentives</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>{poolMetrics.APR}</div>
                            <div>{poolMetrics.currentVotes}</div>
                            <div>{poolMetrics.currentIncentives}</div>
                        </div>
                    </div>

                    <div>
                        <div className="text-sm text-gray-600 mb-2">Your incentive</div>
                        <div className="flex gap-2 mb-1">
                            <div className="flex items-center gap-2 border rounded px-2 py-1 bg-gray-50">
                                <div className="w-6 h-6 bg-gray-200 rounded"></div>
                                <select
                                    value={selectedToken.symbol}
                                    onChange={(e) => setSelectedToken(whitelistedTokens.find(t => t.symbol === e.target.value) || whitelistedTokens[0])}
                                    className="bg-transparent border-none focus:outline-none text-sm"
                                >
                                    {whitelistedTokens.map((token) => (
                                        <option key={token.symbol} value={token.symbol}>
                                            {token.symbol}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0"
                                className="flex-1 border rounded px-3 py-1 text-sm"
                            />
                        </div>
                        <div className="text-right text-sm text-gray-500">
                            Available: 0.0 {selectedToken.symbol}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex items-top justify-center min-h-screen">
                <div>
                    <div className="border border-gray-200 p-4">
                        <div className="relative bg-white rounded-lg max-w-md w-full">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-gray-100 rounded"></div>
                                Hyperstable
                            </div>
                        </div>

                        <div className="space-y-4 mb-8">
                            <p className="text-gray-600 leading-relaxed">
                                Incentives are usually provided by the protocols. By continuing with the next
                                steps you acknowledge that you understand the mechanics of the
                                protocol and that after depositing any rewards as incentives you won't be
                                able to withdraw them.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                By providing an incentive, you may draw more liquidity providers. Votes
                                are a decisive factor on how much emissions a liquidity pool will get next
                                epoch. The more emissions are flowing to a liquidity pool, the more
                                rewards for those who provide liquidity to the pool.
                            </p>
                        </div>

                        <button
                            onClick={handleConfirm}
                            className="w-full bg-gray-100 text-gray-800 py-2 rounded hover:bg-gray-200 transition-colors"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
